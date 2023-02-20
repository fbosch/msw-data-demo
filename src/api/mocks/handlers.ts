import { rest } from 'msw'
import { db } from './factory'

export const handlers = [
  ...db.author.toHandlers("rest"),
  ...db.book.toHandlers("rest"),
  rest.get('/ratings', (req, res, ctx) => {
    const bookId = req.url.searchParams.get('bookId')
    const ratingsForBook = db.rating.findMany({
      where: {
        bookId: { equals: bookId }
      },
    })
    return res(ctx.delay(200), ctx.json(ratingsForBook))
  }),
  // overwrites the default handler for the rating resource
  ...db.rating.toHandlers("rest"),
]
