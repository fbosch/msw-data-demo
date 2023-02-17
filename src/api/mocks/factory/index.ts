import 'minifaker/locales/en'
import { factory, drop } from '@mswjs/data'
import { setSeed, arrayElement, number } from 'minifaker';
import { author } from './author'
import { book } from './book'
import { rating } from './rating'

export const db = factory({
  author,
  book,
  rating
})

export function initialize() {
  drop(db)
  setSeed('books-demo')

  const authors = Array.from({ length: 100 }).map(() => db.author.create())

  const books = Array.from({ length: 1000 }).map(() => {
    const author = arrayElement(authors)
    return db.book.create({
      author
    })
  })


  const ratings = books.flatMap((book) => {
    const amountOfRatings = number({ min: 0, max: 10 })
    return Array.from({ length: amountOfRatings }).map(() => {
      return db.rating.create({
        bookId: book.id,
      })
    })
  })


  console.log({ authors, books, ratings })

  // const books = authors.map((author) => {
  //   return db.book.create({
  //     author: author
  //   })
  // })

}

initialize()
