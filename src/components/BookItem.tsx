import clsx from 'clsx'
import { Book } from '../api/view-models/Book'

export function BookItem({ book, onClick }: { book: Book, onClick: () => void }) {
  return (
    <div className={clsx(
      "bg-cover bg-gray-50 rounded-md h-[250px] width-[150px]",
      "flex flex-col justify-end border border-gray-50 drop-shadow-md",
      "transition duration-150 ease-in-out transform hover:scale-105 cursor-pointer",
    )}
      style={{ backgroundImage: `url("${book.imageUrl}")` }}
      onClick={onClick}
    >
      <div className={clsx(
        "text-gray-800 text-center bg-white/40 text-shadow-md rounded backdrop-blur",
        "text-sm p-2 basis-0"
      )}>
        {book.title}
      </div>
    </div>
  )

}
