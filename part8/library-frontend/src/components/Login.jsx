import { useState } from 'react'
import LoginForm from './LoginForm'

const Login = ({ show, setToken }) => {
  const [error, setError] = useState(null)

  let timeoutId = null
  const setErrorWithTimeout = (error) => {
    if (timeoutId) clearTimeout(timeoutId)
    setError(error)
    timeoutId = setTimeout(() => {
      setError(null)
    }, 3000)
  }

  const clearError = () => {
    if (timeoutId) clearTimeout(timeoutId)
    setError(null)
  }

  if (!show) {
    return null
  }
  
  return (
    <div>
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <LoginForm setError={setErrorWithTimeout} clearError={clearError} setToken={setToken} />
    </div>
  )
}

export default Login