import { rest } from 'msw'
import { db } from './factory'

export const handlers = [
  ...db.author.toHandlers("rest"), // localhost:3000/authors
  rest.get('/books', (req, res, ctx) => {
    const query = req.url.searchParams.get('q')
    // take over handling of the book resource if query is present
    if (query) {
      const searchResults = db.book.findMany({
        where: {
          title: {
            contains: query
          }
        }
      })
      return res(ctx.delay(200), ctx.json(searchResults))
    }
  }),
  ...db.book.toHandlers("rest"), // localhost:3000/books
  rest.get('/ratings', (req, res, ctx) => {
    const bookId = req.url.searchParams.get('bookId')
    const page = req.url.searchParams.get('page')
    const perPage = Number(req.url.searchParams.get('perPage'))
    // take over handling of the rating resource if bookId is present
    if (bookId) {
      const ratingsForBook = db.rating.findMany({
        where: {
          bookId: { equals: bookId }
        },
        take: perPage,
        skip: perPage * (page ? parseInt(page) : 0)
      })
      return res(ctx.delay(500), ctx.json(ratingsForBook))
    }
  }),
  ...db.rating.toHandlers("rest"), // localhost:3000/ratings
]
