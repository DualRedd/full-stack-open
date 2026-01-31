import { useEffect, useState } from 'react'
import personService from './services/person'
import Persons from './components/persons'
import NewPersonForm from './components/person_form'

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