import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import countryService from './services/countries'

const App = () => {
  const [newValue, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])

  useEffect(() => {
    if (countries.length === 0) {
      countryService
        .getCountry()
        .then(initialCountries => setCountries(initialCountries))
    }
    
    if (countriesToShow.length === 1) {
        countryService
          .getWeather(countriesToShow[0].capital[0])
          .then(returnedWeather => setWeather(returnedWeather))
    }
  }, [newValue])

  const countriesToShow = newValue === '' 
    ? countries
    : countries.filter(country => RegExp(newValue, "gi").test(country.name.common))
   
  const handleChange = (event) =>{
    setValue(event.target.value)
  }
  
  const showCountryOf = selectedCountry => {
    setValue(selectedCountry)
  }

  return (
    <div>
      find countries <input value={newValue} onChange={handleChange} />
      <Countries 
        countriesToShow={countriesToShow} 
        showCountry={showCountryOf} 
        weather={weather}
      />
    </div>
  )
}

export default App
