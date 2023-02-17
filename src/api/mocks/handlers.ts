import { db } from './factory'

export const handlers = [
  ...db.author.toHandlers("rest"),
  ...db.book.toHandlers("rest")
]
