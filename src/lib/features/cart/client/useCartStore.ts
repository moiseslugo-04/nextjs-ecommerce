import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SerializedProduct } from '../../products/product.types'
import { toast } from 'sonner'
type CartStore = {
  add: (item: SerializedProduct) => void
  remove: (id: number) => void
  cart: SerializedProduct[]
  totalCart: () => number
  increment: (id: number) => void
  decrement: (id: number) => void
}
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      add: (item) => {
        const cart = get().cart
        const isInCart = cart.find((i) => i.id === item.id)
        if (isInCart) {
          set({
            cart: cart.map((i) => {
              if (i.id === item.id) {
                return { ...i, quantity: i.quantity! + 1 }
              }
              return i
            }),
          })
          toast.success('Item increment ')
          return
        }
        set({
          cart: [...cart, { ...item, quantity: 1 }],
        })
        toast.success('Item Added ')
      },
      remove: (id) => {
        const cart = get().cart
        const newCart = cart.filter((item) => item.id !== id)
        set({ cart: newCart })
        toast.success('Item removed')
      },
      totalCart: () => {
        const cart = get().cart
        return cart.reduce(
          (acc, current) => acc + current.price * (current?.quantity ?? 1),
          0
        )
      },
      increment: (id) => {
        {
          const cart = get().cart
          const newCart = cart.map((item) => {
            if (item.id === id) {
              return { ...item, quantity: item.quantity! + 1 }
            }
            return item
          })
          set({ cart: newCart })
        }
      },
      decrement: (id) => {
        {
          const cart = get().cart
          const newCart = cart.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                quantity: item.quantity! > 1 ? item.quantity! - 1 : 1,
              }
            }
            return item
          })
          set({ cart: newCart })
        }
      },
    }),
    { name: 'cart_storage' }
  )
)
