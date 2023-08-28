import axios from 'axios'
const countryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
const api_key = import.meta.env.VITE_COUNTRIES_API

const getWeather = capital => {
    const request = axios.get(`${weatherUrl}${capital}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
}

const getCountry = () => {
    const request = axios.get(countryUrl)
    return request.then(response => response.data)
}

export default { getCountry, getWeather }