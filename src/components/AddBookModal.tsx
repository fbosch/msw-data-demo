
import clsx from 'clsx'
import queryClient from '../queryClient'
import { useMutation } from '@tanstack/react-query'
import { Book } from '../api/view-models/Book'
import { Dialog } from '@headlessui/react'
import { useAuthors } from '../api/hooks/useAuthors'
import { useCallback } from 'react';

export function AddBookModal({ isOpen, onClose }: { isOpen: boolean, onClose: (toggle: boolean) => void }) {
  const { data: authors, isSuccess } = useAuthors();

  const { mutate } = useMutation((variables: Book) => fetch('/books', {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(variables),
    method: 'POST'
  }), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    }
  })

  const handleSubmit = useCallback((event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const values = Object.fromEntries(formData.entries()) as any
    const author = authors?.find(author => author.id === values.author)
    mutate({
      ...values,
      author
    })
  }, [mutate])

  return (
    <Dialog open={isOpen && isSuccess} onClose={(toggle) => {
      onClose(toggle)
    }}
      className="fixed top-0 right-0 z-[100] grid h-screen backdrop-blur w-screen items-center justify-center p-10"
    >
      <div
        className="bg-gray-500 fixed inset-0 opacity-[.72] "
        aria-hidden="true"
      />
      <Dialog.Panel className={
        clsx('absolute bg-white w-[500px] left-1/2 -translate-x-1/2 p-10 rounded-md')
      }>
        <div className='flex space-x-10'>
          <div>
            <Dialog.Title className='text-2xl mb-1' as={'h2'}>
              Add Book
            </Dialog.Title>
          </div>
        </div>
        <hr className='my-5' />
        <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='bookTitle'>Title</label>
            <input type='text' id='bookTitle' className='border rounded w-full p-2' name='title' required />
          </div>
          <div>
            <label htmlFor='bookDescription'>Description</label>
            <textarea id='bookDescription' className='border rounded w-full p-2' name='description' required />
          </div>
          <div>
            <label htmlFor='bookAuthor'>Author</label>
            <select id='bookAuthor' className='border rounded w-full p-2' name='author' defaultValue='' required>
              <option value='' disabled />
              {authors?.map((author) => (
                <option value={author.id} key={author?.id}>{author?.firstName} {author?.lastName}</option>
              ))}
            </select>
          </div>
          <button className='rounded bg-blue-400 p-3 text-white'>Submit</button>
        </form>
      </Dialog.Panel>
    </Dialog>
  )

}
