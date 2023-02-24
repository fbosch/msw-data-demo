import { useQuery } from '@tanstack/react-query';
import { Book } from '../view-models/Book';

export function useBooks(search: string) {
  return useQuery<Book[]>(
    ['books', search !== "" ? search : null].filter(Boolean),
    () => fetch('/books' + (search && search !== '' ? `?q=${search}` : ''))
      .then((res) => res.json()),
    {
      select: (data) => data.sort((a, b) => a.title.localeCompare(b.title)),
      keepPreviousData: true,
    }
  );
}
