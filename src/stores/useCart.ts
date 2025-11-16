import { SerializedProduct } from '@/types/product'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartState {
  items: SerializedProduct[]
  addItem: (item: SerializedProduct) => void
  removeItem: (id: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
)
