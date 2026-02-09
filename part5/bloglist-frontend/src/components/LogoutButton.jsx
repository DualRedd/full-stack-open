import { setToken } from '../services/auth'

const LogoutButton = ({ setUser, setSuccess }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('bloglistLoggedUser')
    setUser(null)
    setToken(null)
    setSuccess('logged out')
    setTimeout(() => {
      setSuccess(null)
    }, 5000)
  }

  return (
    <button onClick={handleLogout}>logout</button>
  )
}

export default LogoutButton
