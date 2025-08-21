export class Book {
  constructor({
    id,
    title,
    author,
    price,
    listPrice,
    badge,
    category,
    rating,
  }) {
    Object.assign(this, {
      id,
      title,
      author,
      price,
      listPrice,
      badge,
      category,
      rating,
    });
  };
};
