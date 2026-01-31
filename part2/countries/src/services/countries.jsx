import axios from "axios"

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api"

const getNames = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => {
        return response.data.map(country => country.name.common)
    })
}

const getData = (country) => {
    const request = axios.get(`${baseUrl}/name/${country}`)
    return request.then(response => response.data)
}

export default { getNames, getData }