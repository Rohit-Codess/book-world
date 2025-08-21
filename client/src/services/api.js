const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const sampleBooks = [
  {
    id: "gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 299,
    listPrice: 399,
    badge: "25% OFF",
    category: "Fiction",
    rating: 4.8,
  },
  {
    id: "mockingbird",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 349,
    listPrice: 449,
    badge: "22% OFF",
    category: "Fiction",
    rating: 4.7,
  },
  {
    id: "1984",
    title: "1984",
    author: "George Orwell",
    price: 279,
    listPrice: 359,
    badge: "20% OFF",
    category: "Fiction",
    rating: 4.9,
  },
];

export const Api = {
  async listBooks(params = {}) {
    await delay(200);
    return sampleBooks;
  },
};
