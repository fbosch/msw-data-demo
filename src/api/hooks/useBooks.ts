import { useQuery } from '@tanstack/react-query';
import { Book } from '../view-models/Book';

export function useBooks(search: string) {
  return useQuery<Book[]>(
    ['books', search],
    () => fetch('/books' + (search && search !== '' ? `?q=${search}` : '')).then((res) => res.json()),
    {
      keepPreviousData: true,
    }
  );
} 
