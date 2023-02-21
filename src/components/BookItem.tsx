import clsx from 'clsx'
import memoize from 'lodash.memoize'
import { Book } from '../api/view-models/Book'
import { arrayElement } from 'minifaker'


export function BookItem({ book, onClick, className }: { book?: Book | null, onClick: () => void, className?: string }) {
  if (!book) return null
  return (
    <div className={clsx(
      "bg-cover bg-gray-50 h-[250px] width-[150px] font-serif",
      "flex flex-col px-4 drop-shadow-md rounded-r-md border-r-4 border-yellow-50",
      className,
      seededClassNames(book.id)
    )}
      style={{ backgroundImage: `url("${book.imageUrl}")` }}
      onClick={onClick}
    >
      <div className={clsx(
        "text-gray-800 text-center ",
        "px-2 py-1 basis-0 ",
        seededBackgroundClassName(book.id)
      )}>
        {book.title}
        <span className='block text-[8px] opacity-70'>{book.author?.firstName} {book.author?.lastName}</span>
      </div>
    </div>
  )
}

const justification = [
  'justify-start pt-4',
  'justify-end pb-4',
  'justify-center',
]

const fontStyle = [
  'italic',
  'not-italic',
]

const weight = [
  'font-thin leading-snug',
  'font-extralight leading-4',
  'font-light',
  'font-normal',
  'font-medium',
  'font-semibold leading-wide',
  'font-bold',
]

const backgrounds = [
  'bg-white outline-double outline-white border-gray-300 border-2',
  'bg-white rounded-lg p-2',
  'bg-gray-50 outline-double outline-gray-50 border-gray-300 border-2',
  'bg-black outline-double outline-black border-gray-300 border-2 text-white',
  'transparent text-white text-shadow-md',
  'transparent text-white text-shadow-md'
]


const seededClassNames = memoize((bookId: string) => {
  return [
    arrayElement(justification),
    arrayElement(fontStyle),
    arrayElement(weight),
  ].join(' ')
})

const seededBackgroundClassName = memoize((bookId: string) => {
  return [
    arrayElement(backgrounds)
  ].join(' ')
})

