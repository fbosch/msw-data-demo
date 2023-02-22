import { useQuery } from '@tanstack/react-query';
import { Author } from '../view-models/Author';

export function useAuthors() {
  return useQuery<Author[]>(
    ['authors'],
    () => fetch('/authors').then((res) => res.json()),
    {
      keepPreviousData: true,
    }
  );
} 
