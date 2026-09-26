import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
    persist(
        (set) => ({
            items: [],

            addItem: (dish) =>
                set((state) => {
                    const existing = state.items.find(
                        (item) => item.id === dish.id
                    );

                    if (existing) {
                        return {
                            items: state.items.map((item) =>
                                item.id === dish.id
                                    ? {
                                          ...item,
                                          quantity: item.quantity + 1,
                                      }
                                    : item
                            ),
                        };
                    }

                    return {
                        items: [
                            ...state.items,
                            { ...dish, quantity: 1 },
                        ],
                    };
                }),

            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter(
                        (item) => item.id !== id
                    ),
                })),

            increase: (id) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id
                            ? {
                                  ...item,
                                  quantity: item.quantity + 1,
                              }
                            : item
                    ),
                })),

            decrease: (id) =>
                set((state) => ({
                    items: state.items
                        .map((item) =>
                            item.id === id
                                ? {
                                      ...item,
                                      quantity: item.quantity - 1,
                                  }
                                : item
                        )
                        .filter((item) => item.quantity > 0),
                })),

            clearCart: () => set({ items: [] }),
        }),
        {
            name: "addis-eats-cart",
        }
    )
);

export default useCartStore;