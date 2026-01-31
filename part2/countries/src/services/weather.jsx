import axios from "axios"

const getWeather = (lat, lon) => {
    const request = axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
    return request.then(response => response.data)
}

export default { getWeather }
