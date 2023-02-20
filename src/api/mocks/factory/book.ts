import { Book } from '../../view-models/Book'
import { primaryKey, oneOf, manyOf, nullable } from '@mswjs/data'
import { uuid, jobTitle, arrayElement, price, number } from 'minifaker'

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
  ratings: manyOf('rating'),
  avgRating: number,
  description: () => `
lorem ipsum dolor sit amet, consectetur adipiscing elit.
sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
`,
  imageUrl: () => `https://picsum.photos/id/${number({ min: 1, max: 249 })}/350/250`,
  // imageUrl: () => `https://api.lorem.space/image/book?w=250&h=350&hash=${ash()}`
}
