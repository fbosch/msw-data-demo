
import { useQuery } from '@tanstack/react-query';
import { Rating } from '../view-models/Rating';

export function useRatings(bookId?: string) {
  return useQuery<Rating[]>(['ratings', bookId], () => fetch('/ratings?bookId=' + bookId).then((res) => res.json()), {
    enabled: !!bookId
  });
}
