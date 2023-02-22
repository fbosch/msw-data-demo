import { Book } from '../api/view-models/Book';
import clsx from 'clsx'
import { useState, useTransition } from 'react'
import { useBooks } from '../api/hooks/useBooks';
import { BookItem } from './BookItem';
import { BookModal } from './BookModal';
import { AddBookModal } from './AddBookModal';

export default function BookList() {
  const [_, startTransition] = useTransition();
  const [search, setSearch] = useState('');
  const { data: books } = useBooks(search)
  const [activeBook, setActiveBook] = useState<Book | null>(null)
  const [showAddBookModal, setShowAddBookModal] = useState(false)

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className='flex justify-between items-center pt-10 '>
        <h1 className="font-serif text-4xl ml-4 flex-1">📚 Library</h1>
        <input type='search' className='border rounded h-12 flex-1 p-4' placeholder='Search' onChange={(event) => {
          startTransition(() => {
            setSearch(event.target.value)
          })
        }} />
        <div className='flex-1 flex justify-end'>
          <button className='rounded text-white bg-blue-300 h-10 w-10 text-lg' title='Add book' onClick={() => {
            setShowAddBookModal(true)
          }} >+</button>
          <AddBookModal isOpen={showAddBookModal} onClose={() => setShowAddBookModal(false)} />
        </div>
      </div>
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
