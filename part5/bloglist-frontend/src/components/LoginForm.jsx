import { useState } from 'react'
import loginService from '../services/login'
import { setToken } from '../services/auth'

const LoginForm = ({ setUser, setError, setSuccess }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    loginService.login(username, password)
      .then(user => {
        window.localStorage.setItem(
          'bloglistLoggedUser', JSON.stringify(user)
        )
        setUser(user)
        setToken(user.token)
        setUsername('')
        setPassword('')
        setSuccess(`welcome ${user.name}`)
        setTimeout(() => {
          setSuccess(null)
        }, 5000)
      })
      .catch(() => {
        setError('wrong username or password')
        setTimeout(() => {
          setError(null)
        }, 5000)
      })
  }

  return (
    <>
    <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm