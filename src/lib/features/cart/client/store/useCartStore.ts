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
  addItem: (item: CartItemType) => void
  removeItem: (id: number) => void
  totalCart: () => number
  increment: (id: number) => void
  decrement: (id: number) => void
  setCartFromDB: (products: ProductFromDB[]) => void
  clearCart: () => void
  isSync: boolean
  setIsSync: (isSync: boolean) => void
}
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      isSync: false,
      addItem: (item) =>
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
            cart: [...state.cart, { ...item, quantity: 1 }],
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
          cart: state.cart
            .map((item) => {
              if (item.id !== id) return item
              const newQty = (item.quantity ?? 1) - 1
              return { ...item, quantity: newQty }
            })
            .filter((item) => item.quantity! > 0),
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
      setIsSync: (isSync) => set({ isSync }),
    }),
    { name: 'cart_storage' }
  )
)
