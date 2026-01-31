import { useState, useEffect } from 'react'
import countryService from './services/countries'
import CountryView from './components/country_view'

const SearchBar = ({ query, setQuery }) => {
  return (
    <>
    <label htmlFor="search">Find countries:</label>
    <input id="search" type="text" value={query} onChange={(e) => setQuery(e.target.value)}/>
    </>
  )
}

const CountryListEntry = ({ countryName, onShow }) => {
  return (
    <div>
      <span>{countryName}</span>
      <button onClick={() => onShow(countryName)}>show</button>
    </div>
  )
}

const CountryList = ({ countries, onShow }) => {
  return (
    <div>
      {countries.map(country => <CountryListEntry key={country} countryName={country} onShow={onShow} />)}
    </div>
  )
}

const App = () => {
  const [query, setQuery] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  
  useEffect(() => {
    countryService.getNames()
      .then(countries => setAllCountries(countries))
  }, [])

  useEffect(() => {
    setSelectedCountry(null)
  }, [query])

  const filteredCountries = allCountries.filter(country => 
    country.toLowerCase().includes(query.toLowerCase())
  )
  if (filteredCountries.length === 1 && !selectedCountry) {
    setSelectedCountry(filteredCountries[0])
  }

  return (
    <div>
      <SearchBar query={query} setQuery={setQuery} />
      {!selectedCountry && (filteredCountries.length === 0 || query === '') ? (
        null
      ) : selectedCountry ? (
        <CountryView countryName={selectedCountry} />
      ) : filteredCountries.length <= 10 ? (
        <CountryList countries={filteredCountries} onShow={name => setSelectedCountry(name)} />
      ) : (
        <p>Too many matches, specify another filter</p>
      )
      }
    </div>
  )
}

export default App
