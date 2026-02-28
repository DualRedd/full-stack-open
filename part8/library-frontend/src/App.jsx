import { useState } from 'react'
import { useApolloClient } from '@apollo/client/react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import Login from './components/Login'

const App = () => {
  const client = useApolloClient()
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))

  const [page, setPage] = useState('authors')
  const [error, setError] = useState(null)

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.resetStore()
    setPage('login')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommendations')}>recommendations</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={handleLogout}>logout</button>}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommendations show={page === 'recommendations'} />

      <Login show={page === 'login'} setToken={setToken} />
    </div>
  )
}

export default App
