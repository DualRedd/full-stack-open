import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [found, setFound] = useState(false)

  useEffect(() => {
    setFound(false)
    setLoading(true)
    axios.get(`https://restcountries.com/v3.1/name/${name}`).then((response) => {
      const country = response.data[0]
      setData({
        name: country.name.common,
        capital: country.capital,
        population: country.population,
        flag: country.flags.png,
      })
      setFound(true)
    }).catch(() => {
      setFound(false)
    }).finally(() => {
      setLoading(false)
    })
  }, [name])

  if (loading) {
    return null
  }

  console.log(data, found)

  return { data, found }
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App