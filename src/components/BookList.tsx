import { Book } from '../api/view-models/Book';
import { useState } from 'react'
import { useBooks } from '../api/hooks/useBooks';
import { BookItem } from './BookItem';
import { BookModal } from './BookModal';

export default function BookList() {
  const { data: books } = useBooks()
  const [activeBook, setActiveBook] = useState<Book | null>(null)

  return (
    <>
      <BookModal book={activeBook} isOpen={Boolean(activeBook)} onClose={() => { setActiveBook(null) }} />
      <ol className="grid grid-cols-5 gap-8 p-4 max-w-[1100px] mx-auto">
        {books?.map((book) => (<li key={book.id}>
          <BookItem book={book} onClick={() => setActiveBook(book)} />
        </li>))}
      </ol>
    </>
  )
}
