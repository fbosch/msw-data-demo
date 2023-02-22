import 'minifaker/locales/en'
import { factory, drop } from '@mswjs/data'
import { setSeed, arrayElement, number } from 'minifaker';
import { author } from './author'
import { book } from './book'
import { rating } from './rating'

// Create a database factory
export const db = factory({
  author,
  book,
  rating
})

export function initialize() {
  console.log('initialize!')
  // Reset the database
  drop(db)

  // Set the seed to a fixed value to always generate the same data
  setSeed('books-demo')

  // Generate 30 authors
  const authors = Array.from({ length: 30 }).map(() => db.author.create())

  // Generate 20 books and assign them to a random author
  const books = Array.from({ length: 100 }).map(() => {
    const author = arrayElement(authors) // Pick a random author
    return db.book.create({ author })
  })

  // Generate 0-15 ratings for each book
  const ratings = books.map((book) => {
    const amountOfRatings = number({ min: 0, max: 15 }) // Decide how many ratings to generate
    const bookRatings = Array.from({ length: amountOfRatings }).map(() => {
      return db.rating.create({
        bookId: book.id, // Assign the rating to the book
        rating: number({ min: 1, max: 5 }) // Generate a random rating between 1 and 5
      })
    })

    const sum = bookRatings.reduce((sum, rating) => sum + rating.rating, 0)
    // Calculate the average rating for the book
    const avgRating = bookRatings.length > 0 ? sum / bookRatings.length : 0


    // Update the book with the average rating
    db.book.update({
      where: {
        id: {
          equals: book.id
        }
      },
      data: {
        avgRating: avgRating,
        amountOfRatings: bookRatings.length
      }
    })

    return bookRatings
  })


  console.log({ authors, books, ratings })
}

initialize() // Initialize the database with some data
