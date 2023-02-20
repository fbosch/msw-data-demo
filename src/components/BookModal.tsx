import clsx from 'clsx'
import { useState } from 'react'
import { useRatings } from '../api/hooks/useRatings'
import { Book } from '../api/view-models/Book'
import { Dialog } from '@headlessui/react'
import { BookItem } from './BookItem'


export function BookModal({ book, isOpen, onClose }: { book: Book | null, isOpen: boolean, onClose: (toggle: boolean) => void }) {

  const { data: ratings, isSuccess } = useRatings(book?.id)
  const { title, description, imageUrl, avgRating, author } = book || {}
  const [showCommentFields, setShowCommentFields] = useState(false)

  const filledStars = Array.from({ length: Math.floor(avgRating ?? 0) })
  const emptyStars = Array.from({ length: 5 - filledStars.length })
  const stars = [...filledStars.map(() => '⭐'), ...emptyStars.map(() => '☆')].join('')

  return (
    <Dialog open={isOpen && isSuccess} onClose={(toggle) => {
      setShowCommentFields(false)
      onClose(toggle)
    }}
      className="fixed top-0 right-0 z-[100] grid h-screen backdrop-blur w-screen items-center justify-center p-10"
    >
      <div
        className="bg-gray-500 fixed inset-0 opacity-[.72] "
        aria-hidden="true"
      />
      <Dialog.Panel className={
        clsx('absolute bg-white w-[1000px] left-1/2 -translate-x-1/2 p-10 rounded-md')
      }>
        <div className='flex space-x-10'>
          <div>
            <BookItem book={book} onClick={() => { }} className='h-[300px] w-[200px]' />
            <div className='text-3xl mt-4 text-gray-200 align-middle flex items-center'>{stars} <span className='text-gray-300 text-xl ml-3'>({ratings?.length})</span></div>
          </div>
          <div>
            <Dialog.Title className='text-3xl mb-1' as={'h2'}>
              {title}
            </Dialog.Title>
            <h3 className='text-lg text-gray-600 mb-4'>By {author?.firstName} {author?.lastName}</h3>
            <Dialog.Description className='text-md mb-4 text-gray-400'>
              {description}
            </Dialog.Description>
          </div>
        </div>
        <hr className='my-5' />
        {showCommentFields ? <div className='flex flex-col space-y-2 w-1/2'>
          <input type='text' className='border rounded  p-3' placeholder='Title' />
          <textarea className='rounded border  h-[100px] p-3' placeholder='Description' />
          <button className='bg-blue-500 p-4 text-lg text-white rounded'>Submit</button>
        </div> : <button className='bg-blue-400 p-2 text-md text-white rounded' onClick={() => setShowCommentFields(true)}>Add Review</button>}
      </Dialog.Panel>
    </Dialog>
  )

}
