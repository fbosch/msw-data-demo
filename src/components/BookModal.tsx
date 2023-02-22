import clsx from 'clsx'
import { useState } from 'react'
import { useRatings } from '../api/hooks/useRatings'
import { Book } from '../api/view-models/Book'
import { Dialog } from '@headlessui/react'
import { BookItem } from './BookItem'


function getStars(rating: number) {
  const filledStars = Array.from({ length: Math.floor(rating ?? 0) })
  const emptyStars = Array.from({ length: 5 - filledStars.length })
  const stars = [...filledStars.map(() => '⭐'), ...emptyStars.map(() => '☆')].join('')
  return stars
}

const perPage = 3
export function BookModal({ book, isOpen, onClose }: { book: Book | null, isOpen: boolean, onClose: (toggle: boolean) => void }) {

  const [page, setPage] = useState(1)
  const { data: ratings, isSuccess, isFetching, isPreviousData } = useRatings(book?.id, page, perPage, isOpen)
  const { title, description, avgRating, amountOfRatings, author } = book || {}
  const [showCommentFields, setShowCommentFields] = useState(false)
  const amountOfPages = Math.ceil(Number(amountOfRatings) / perPage)

  return (
    <Dialog
      key={book?.id}
      open={isOpen && isSuccess}
      onClose={(toggle) => {
        setShowCommentFields(false)
        setPage(1)
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
            <div className='text-3xl mt-4 text-gray-200 align-middle flex items-center'>
              {getStars(Number(avgRating))}
              <span className='text-gray-300 text-xl ml-3'>({amountOfRatings})</span>
            </div>
          </div>
          <div>
            <Dialog.Title className='text-3xl mb-1' as={'h2'}>
              {title}
            </Dialog.Title>
            <h3 className='text-lg text-gray-600 mb-4 flex items-center space-x-2'>
              <span>By {author?.firstName} {author?.lastName}</span>
              <img src={author?.imageUrl} className='h-6 w-6 rounded-full bg-gray-300' />
            </h3>
            <Dialog.Description className='text-md mb-4 text-gray-400'>
              {description}
            </Dialog.Description>
          </div>
        </div>
        <hr className='my-5' />
        {showCommentFields ? (
          <>
            <div className='flex flex-col space-y-2 w-1/2'>
              <input type='text' className='border rounded  p-3' placeholder='Title' />
              <textarea className='rounded border  h-[100px] p-3' placeholder='Description' />
              <button className='bg-blue-500 p-4 text-lg text-white rounded'>Submit</button>
            </div>
            <hr className='my-5' />
          </>)
          : <button className='bg-blue-400 p-2 text-md text-white rounded' onClick={() => setShowCommentFields(true)}>Add Review</button>}
        <ol className={clsx('flex flex-col space-y-4 mt-1 transition-opacity', {
          'opacity-10 cursor-wait grayscale': isFetching && isPreviousData,
        })}>
          {ratings?.map(rating => (
            <li key={rating.id} className='border-b py-2'>
              <h3 className='text-lg'>{rating.title}</h3>
              <p className='text-gray-500'>{rating.comment}</p>
              <div className='text-gray-200'>
                {getStars(rating.rating)}
              </div>
            </li>
          ))}
        </ol>
        {amountOfPages > 1 ? (
          <nav className='mt-4 flex justify-center' role='navigation'>
            <ol className='space-x-2'>
              {Array.from({ length: amountOfPages }).map((_, index) => (
                <li key={index} className='inline-block'>
                  <button
                    className='cursor-pointer border p-2 w-10 h-10 rounded aria-selected:bg-blue-300 aria-selected:text-white'
                    aria-selected={index + 1 === page}
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>))}
            </ol>
          </nav>
        ) : null}
      </Dialog.Panel>
    </Dialog>
  )

}
