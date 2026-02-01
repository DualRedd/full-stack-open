import { useState } from 'react'
import personService from '../services/person'
import Notification from './notification'

const NewPersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const exists = persons.some(p => p.name === newName)

    if (exists) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        return
      }

      const person = persons.find(p => p.name === newName)
      const updatedPerson = { ...person, number: newNumber }

      personService.update(person.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          setSuccessMessage(`Updated ${returnedPerson.name}`)
          setTimeout(() => setSuccessMessage(null), 3000)
        })
        .catch(error => {
          setErrorMessage(`Failed to update ${person.name}`)
          setTimeout(() => setErrorMessage(null), 3000)
        })
    }
    else {
      const person = {
        name: newName,
        number: newNumber
      }

      personService.create(person)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setSuccessMessage(`Added ${newPerson.name}`)
          setTimeout(() => setSuccessMessage(null), 3000)
        })
        .catch(error => {
          setErrorMessage(`Failed to add ${person.name}`)
          setTimeout(() => setErrorMessage(null), 3000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <>
    <Notification message={successMessage} type="success" />
    <Notification message={errorMessage} type="error" />
    <form onSubmit={handleFormSubmit}>
      <div>
        name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </>
  )
}

export default NewPersonForm