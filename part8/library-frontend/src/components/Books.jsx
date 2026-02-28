import { useQuery } from '@apollo/client/react'
import { GET_BOOKS, GET_GENRES } from '../queries'
import { useState } from 'react'
import BookTable from './BookTable'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const resultGenres = useQuery(GET_GENRES)
  const resultBooks = useQuery(GET_BOOKS, { variables: { genre } })

  if (!props.show) {
    return null
  }

  if (resultGenres.loading || resultBooks.loading) {
    return <div>loading...</div>
  }

  if (resultGenres.error || resultBooks.error) {
    return <div>{resultGenres.error.message || resultBooks.error.message}</div>
  }

  return (
    <div>
      <h2>books</h2>
      <BookTable books={resultBooks.data.books} />
      <div>
        {resultGenres.data.genres.map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
