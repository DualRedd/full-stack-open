import { useQuery } from '@apollo/client/react'
import { GET_AUTHORS } from '../queries'
import EditBirthyear from './EditBirthyear'

const Authors = (props) => {
  const result = useQuery(GET_AUTHORS)

  if (!props.show) {
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
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditBirthyear authors={result.data.authors} />
    </div>
  )
}

export default Authors
