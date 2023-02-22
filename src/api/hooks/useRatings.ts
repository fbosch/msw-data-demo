
import { useQuery } from '@tanstack/react-query';
import { Rating } from '../view-models/Rating';

export function useRatings(bookId?: string, enabled = true) {
  return useQuery<Rating[]>(['rating', bookId], () => fetch('/ratings?bookId=' + bookId).then((res) => res.json()), {
    enabled: !!bookId && enabled,
  });
}
