import { useQuery } from '@tanstack/react-query';
import { Book } from '../view-models/Book';

export function useBooks() {
  return useQuery<Book[]>(['books'], () => fetch('/books').then((res) => res.json()));
}
