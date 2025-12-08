import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItemType } from '@features/cart/cart.types'
import { SerializedProduct } from '@features/products/product.types'

type ProductFromDB = {
  product: SerializedProduct
  quantity: number
}
type CartStore = {
  cart: CartItemType[]
  addItem: (item: SerializedProduct, isGust: boolean) => void
  removeItem: (id: number) => void
  totalCart: () => number
  increment: (id: number) => void
  decrement: (id: number) => void
  setCartFromDB: (products: ProductFromDB[]) => void
  clearCart: () => void
}
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addItem: (item, isGuest) =>
        set((state) => {
          const isInCart = state.cart.find((i) => i.id === item.id)
          if (isInCart) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            }
          }

          return {
            cart: [...state.cart, { ...item, quantity: 1, isGuest }],
          }
        }),
      removeItem: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      totalCart: () => {
        const cart = get().cart
        return cart.reduce(
          (acc, current) => acc + current.price * current.quantity,
          0
        )
      },
      increment: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),
      decrement: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity! > 1 ? item.quantity - 1 : 1,
                }
              : item
          ),
        })),
      setCartFromDB: (products) => {
        set((state) => ({
          ...state,
          cart: products.map(({ product, quantity }) => {
            return {
              ...product,
              quantity,
              isGuest: false,
            }
          }),
        }))
      },
      clearCart: () => {
        set({ cart: [] })
      },
    }),

    { name: 'cart_storage' }
  )
)
