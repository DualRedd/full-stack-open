import personService from '../services/person'

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
        .catch(() => setPersons(persons.filter(p => p.id !== id)))
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

export default Persons