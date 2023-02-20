import { Book } from '../api/view-models/Book';
import clsx from 'clsx'
import { useState } from 'react'
import { useBooks } from '../api/hooks/useBooks';
import { BookItem } from './BookItem';
import { BookModal } from './BookModal';

export default function BookList() {
  const { data: books } = useBooks()
  const [activeBook, setActiveBook] = useState<Book | null>(null)

  return (
    <div className="max-w-[1100px] mx-auto">
      <h1 className="font-serif text-4xl ml-4 pt-10">📚 Books</h1>
      <hr className='my-5' />
      <BookModal book={activeBook} isOpen={Boolean(activeBook)} onClose={() => { setActiveBook(null) }} />
      <ol className="grid grid-cols-5 gap-8 p-4 mx-auto">
        {books?.map((book) => (<li key={book.id}>
          <BookItem book={book} onClick={() => setActiveBook(book)}
            className={clsx(
              'cursor-pointer transition',
              'hover:scale-105 transform duration-300 ease-in-out'
            )} />
        </li>))}
      </ol>
    </div>
  )
}
