

import { primaryKey, nullable } from '@mswjs/data'
import { Rating } from '../../view-models/Rating'
import { arrayElement, uuid } from 'minifaker'

export const rating = <Record<keyof Rating, any>>{
  id: primaryKey(uuid.v4),
  userId: uuid.v4,
  bookId: uuid.v4,
  rating: nullable(Number),
  title: arrayElement(['Good', 'Bad', 'Average', 'Great', 'Terrible']),
  comment: String
}
