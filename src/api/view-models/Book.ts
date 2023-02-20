import { Author } from "./Author";
import { Rating } from "./Rating";

export interface Book {
  id: string;
  isbn: string;
  title: string;
  language: string;
  description: string;
  imageUrl: string;
  author: Author;
  ratings: Rating[];
  avgRating: number;
  price: number;
}
