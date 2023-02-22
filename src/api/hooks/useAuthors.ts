import { useQuery } from '@tanstack/react-query';
import { Author } from '../view-models/Author';

export function useAuthors(authorId?: string, enabled = true) {
  return useQuery<Author[] | Author>(
    ['authors', authorId].filter(Boolean),
    () => fetch('/authors' + (authorId ? "/" + authorId : "")).then((res) => res.json()),
    {
      enabled,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
} 
