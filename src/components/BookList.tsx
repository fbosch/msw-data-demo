import { useBooks } from '../api/hooks/useBooks';

export default function BookList() {
  const { data: books } = useBooks()

  // return null
  return (
    <ol>
      {books?.map((book) => (<li key={book.id}>{book.title}</li>))}
    </ol>
  )
}
