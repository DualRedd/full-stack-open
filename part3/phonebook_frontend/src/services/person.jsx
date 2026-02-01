import axios from 'axios'
const baseURL = '/api/persons'

const getAll = () => {
  return axios.get(baseURL).then(response => response.data)
}

const create = (newPerson) => {
  return axios.post(baseURL, newPerson).then(response => response.data)
}

const remove = (id) => {
  return axios.delete(`${baseURL}/${id}`).then(response => response.data)
}

const update = (id, updatedPerson) => {
  return axios.put(`${baseURL}/${id}`, updatedPerson).then(response => response.data)
}

export default { getAll, create, remove, update }