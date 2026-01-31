import { useEffect, useState } from 'react'
import personService from './services/person'

const Person = ({ person, handleDelete }) => {
  return (
    <div>
      <span>{person.name} {person.number}</span>
      <button onClick={handleDelete}>delete</button>
    </div>
  )
}

const Persons = ({ persons, setPersons }) => {
  const handleDelete = (id) => {
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)) {
      personService
        .remove(id)
        .then(() => setPersons(persons.filter(p => p.id !== id)))
    }
  }

  return (
    <>
      {persons.map(person => (
        <Person key={person.id} person={person} handleDelete={() => handleDelete(person.id)} />
      ))}
    </>
  )
}

const NewPersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
        })
    }
    setNewName('')
    setNewNumber('')
  }

  return (
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
  )
}

const SearchInput = ({ searchTerm, setSearchTerm }) => (
  <div>
    <input placeholder="search by name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(response => setPersons(response))
  }, [])

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <h2>Add a new</h2>
      <NewPersonForm persons={persons} setPersons={setPersons} />
  
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} setPersons={setPersons} />
    </div>
  )
}

export default App