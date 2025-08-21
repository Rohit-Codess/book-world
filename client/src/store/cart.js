import { create } from "zustand";

export const useCart = create((set, get) => ({
  items: {},
  add: (book) =>
    set((s) => ({
      items: { ...s.items, [book.id]: (s.items[book.id] || 0) + 1 },
    })),
  remove: (id) =>
    set((s) => {
      const clone = { ...s.items };
      delete clone[id];
      return { items: clone };
    }),
  clear: () => set({ items: {} }),
  count: () => Object.values(get().items).reduce((a, b) => a + b, 0),
}));
