const Countries = ({ countriesToShow, showCountry, weather }) => {
    if (countriesToShow.length === 1 && weather.length !== 0) {
        return (
            <div>
                <h1>{countriesToShow[0].name.common}</h1>
                <div>capital {countriesToShow[0].capital}</div>
                <div>area {countriesToShow[0].area}</div>
                <h3>languages</h3>
                <ul>
                    {Object
                        .keys(countriesToShow[0].languages)
                        .map(language => 
                            <li key={countriesToShow[0].languages[language]}>
                            {countriesToShow[0].languages[language]}
                            </li>
                        )
                    }
                </ul>
                <img src={countriesToShow[0].flags.png} style={{width:150}}/>
                <h2>Weather in {countriesToShow[0].capital}</h2>
                <div>temperature {weather.main.temp} Celsius</div>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} style={{width:150}}/>
                <div>wind {weather.wind.speed} m/s</div>
            </div>
        )
    }
    else if (countriesToShow.length < 10) {
        return (
            countriesToShow.map(country => 
            <div key={country.name.common}>
                {country.name.common}
                <button onClick={() => showCountry(country.name.common)}>show</button>
            </div>
            )
        )
    }
    else {
        return <div>Too many matches, specify another filter</div>
    }
  }

export default Countries