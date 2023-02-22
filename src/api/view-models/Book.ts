import { Author } from "./Author";

export interface Book {
  id: string;
  isbn: string;
  title: string;
  language: string;
  description: string;
  imageUrl: string;
  author: Author;
  authorId: string;
  amountOfRatings: number;
  avgRating: number;
  price: number;
}
