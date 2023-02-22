
import { useQuery } from '@tanstack/react-query';
import { Rating } from '../view-models/Rating';

export function useRatings(bookId?: string, page?: number, perPage?: number, enabled = true) {
  return useQuery<Rating[]>(['rating', bookId, page, perPage],
    () => fetch('/ratings?bookId=' + bookId + '&page=' + page + '&perPage=' + perPage)
      .then((res) => res.json()), {
    enabled: !!bookId && enabled,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
}
