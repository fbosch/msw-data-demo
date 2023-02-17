import 'minifaker/locales/en'
import { factory, drop } from '@mswjs/data'
import { setSeed, arrayElement } from 'minifaker';
import { author } from './author'
import { book } from './book'

export const db = factory({
  author,
  book
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

  // const books = authors.map((author) => {
  //   return db.book.create({
  //     author: author
  //   })
  // })

}

initialize()
