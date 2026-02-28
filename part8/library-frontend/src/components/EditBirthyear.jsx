import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { EDIT_AUTHOR, GET_AUTHORS } from '../queries'

const EditBirthyear = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const submit = async (event) => {
    event.preventDefault()
    await editAuthor({ variables: { name, setBornTo: parseInt(born) } })
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value="">-- select author --</option>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>{author.name}</option>
            ))}
          </select>
        </div>
        <div>
          born
          <input type="number" value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default EditBirthyear