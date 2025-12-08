'use server'

import { CartItemType } from '@features/cart/cart.types'
import {
  generateCart,
  incrementProductQuantity,
  decrementProductQuantity,
  clearCart,
  removeItemFromCart,
  addToCart,
} from './cart.service'
import { getSession } from '@features/auth/services/get-session.service'
async function requireUser() {
  const session = await getSession()
  if (!session?.payload) throw new Error('UNAUTHORIZED')
  return session.payload.id
}

export async function syncCartAction(cart: CartItemType[]) {
  try {
    const userId = await requireUser()
    const guestItems = cart.filter((product) => product.isGuest)

    const result = await generateCart(guestItems, userId)
    const safeCart = result.cart.map((item) => ({
      ...item,
      quantity: item.quantity,
      product: {
        ...item.product,
        price: Number(item.product.price),
      },
    }))

    return {
      success: true,
      cart: safeCart,
    }
  } catch (error) {
    console.log(error, 'Unexpected Error')
    return { success: false, code: 'SERVER_ERROR', cart: null }
  }
}

export async function incrementQuantityAction(productId: number) {
  try {
    const userId = await requireUser()
    return incrementProductQuantity(userId, productId)
  } catch (error) {
    console.log(error)
    return { success: false, code: 'UNAUTHORIZED' }
  }
}
export async function decrementQuantityAction(productId: number) {
  try {
    const userId = await requireUser()
    return decrementProductQuantity(userId, productId)
  } catch (error) {
    console.log(error)
    return { success: false, code: 'UNAUTHORIZED' }
  }
}

export async function clearCartAction() {
  try {
    const userId = await requireUser()
    return clearCart(userId)
  } catch (error) {
    console.log(error)
    return { success: false, code: 'UNAUTHORIZED' }
  }
}

export async function removeCartItemAction(productId: number) {
  try {
    const userId = await requireUser()
    return removeItemFromCart(userId, productId)
  } catch (error) {
    console.log(error)
    return { success: false, code: 'UNAUTHORIZED' }
  }
}

export async function addToCartAction(productId: number) {
  try {
    const userId = await requireUser()
    return await addToCart(userId, productId)
  } catch (error) {
    console.log(error)
    return { success: false, code: 'UNAUTHORIZED' }
  }
}
