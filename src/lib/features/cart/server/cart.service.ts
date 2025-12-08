import prisma from '@lib/client'
import { CartItemType } from '@features/cart/cart.types'

export async function generateCart(data: CartItemType[], userId: string) {
  try {
    return prisma.$transaction(async (tx) => {
      //Look for the user cart
      let cart = await tx.cart.findFirst({
        where: { userId },
        include: { items: true },
      })
      //If doesn't has cart create one
      if (!cart) {
        cart = await tx.cart.create({
          data: { userId },
          include: { items: true },
        })
      }

      //Check if the Item already exist and update or create
      if (data.length > 0) {
        for (const product of data) {
          await tx.cartItem.upsert({
            where: {
              cartId_productId: { cartId: cart.id, productId: product.id },
            },
            update: { quantity: { increment: product.quantity ?? 1 } }, // updated existing
            create: {
              productId: product.id,
              cartId: cart.id,
              quantity: product.quantity ?? 1,
            },
          })
        }
      }

      // Get the updated Cart
      const items = await tx.cartItem.findMany({
        where: { cartId: cart.id },
        select: {
          quantity: true,
          product: {
            include: { category: { include: { department: true } } },
          },
        },
      })
      return {
        success: true,
        cart: items,
      }
    })
  } catch (error) {
    console.error('Cart sync error:', error)
    throw new Error('Failed to sync cart')
  }
}
export async function incrementProductQuantity(
  userId: string,
  productId: number
) {
  return prisma.$transaction(async (tx) => {
    //Look for the Item
    const item = await tx.cartItem.findFirst({
      where: {
        cart: { userId },
        productId,
      },
    })

    if (!item) return { success: false, error: 'ITEM_NOT_FOUND' }
    //Update Item cart
    const updatedItem = await tx.cartItem.update({
      where: { id: item.id },
      data: { quantity: { increment: 1 } },
    })
    return { success: true, item: updatedItem }
  })
}

export async function decrementProductQuantity(
  userId: string,
  productId: number
) {
  return prisma.$transaction(async (tx) => {
    const item = await tx.cartItem.findFirst({
      where: {
        cart: { userId },
        productId,
      },
    })

    if (!item) return { success: false, error: 'ITEM_NOT_FOUND' }

    if (item.quantity === 1) {
      //remove item from cart
      await tx.cartItem.delete({ where: { id: item.id } })

      return { success: true, removed: true }
    }

    const updatedItem = await tx.cartItem.update({
      where: { id: item.id },
      data: { quantity: { decrement: 1 } },
    })
    return {
      success: true,
      item: updatedItem,
    }
  })
}
export async function removeItemFromCart(userId: string, productId: number) {
  return prisma.$transaction(async (tx) => {
    const item = await tx.cartItem.findFirst({
      where: { cart: { userId }, productId },
    })

    if (!item) return { success: false, error: 'ITEM_NOT_FOUND' }

    //remove Item
    await tx.cartItem.delete({ where: { id: item.id } })

    return { success: true, item }
  })
}

export async function clearCart(userId: string) {
  return prisma.$transaction(async (tx) => {
    // get user cart
    const cart = await tx.cart.findFirst({
      where: { userId },
      include: { items: true },
    })

    if (!cart) return { success: false, error: 'CART_NOT_FOUND' }

    //clear cart
    await tx.cartItem.deleteMany({ where: { cartId: cart.id } })

    return { success: true, message: 'Cart is clear' }
  })
}

export async function addToCart(userId: string, productId: number) {
  return prisma.$transaction(async (tx) => {
    //Look for the cart
    let cart = await tx.cart.findUnique({
      where: { userId },
      include: { items: true },
    })

    //create a cart if user doesn't has cart
    if (!cart)
      cart = await tx.cart.create({
        data: { userId },
        include: { items: true },
      })
    //update exiting item or create
    await tx.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      update: { quantity: { increment: 1 } },
      create: { productId, cartId: cart.id },
    })

    // Get the updated Cart
    const newItem = await tx.cartItem.findUnique({
      where: {
        cartId_productId: { cartId: cart.id, productId },
      },
      include: {
        product: {
          include: { category: { include: { department: true } } },
        },
      },
    })

    return { success: true, item: newItem }
  })
}
