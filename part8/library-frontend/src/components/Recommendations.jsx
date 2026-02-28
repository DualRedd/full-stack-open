import { useQuery } from '@apollo/client/react'
import { GET_RECOMMENDED_BOOKS } from '../queries'
import BookTable from './BookTable'

const Recommendations = ({ show }) => {
  const result = useQuery(GET_RECOMMENDED_BOOKS)

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  if (result.error) {
    return <div>{result.error.message}</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{result.data.me.favoriteGenre}</strong></p>
      <BookTable books={result.data.recommendedBooks} />
    </div>
  )
}

export default Recommendations
