import { useState } from 'react'

const Person = ({ person }) => (
  <p>{person.name} {person.number}</p>
)

const Persons = ({ persons }) => (
  <>
    {persons.map((person, index) => (
      <Person key={index} person={person} />
    ))}
  </>
)

const NewPersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const person = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(person))
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [searchTerm, setSearchTerm] = useState('')

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
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App