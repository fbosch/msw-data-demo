
import { primaryKey, oneOf, manyOf } from '@mswjs/data'
import { Book } from '../../view-models/Book'
import { uuid, jobTitle, arrayElement, price } from 'minifaker'

const languages: string[] = [
  "English",
  "Danish",
  "Dutch",
  "Finnish",
  "French",
  "German",
  "Italian",
  "Norwegian",
  "Portuguese",
  "Spanish",
  "Swedish",
  "Manx",
  "Afrikaans",
]

export const book = <Record<keyof Book, any>>{
  id: primaryKey(uuid.v4),
  title: jobTitle,
  language: arrayElement(languages),
  price: price,
  author: oneOf('author'),
  ratings: manyOf('rating')
}
