import { Author } from "./Author";
import { Rating } from "./Rating";

export interface Book {
  id: string;
  title: string;
  language: string;
  imageUrl: string;
  author: Author;
  ratings: Rating[];
  price: number;
}
