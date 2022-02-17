import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");

  const handleChange = (event) => {
    setCountryFilter(event.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountriesData(response.data);
    });
  }, []);

  return (
    <div>
      <FindCountries
        countryFilter={countryFilter}
        handleChange={handleChange}
      />
      <FilteredCountries
        countryFilter={countryFilter}
        countriesData={countriesData}
      />
    </div>
  );
};

const FindCountries = ({ countryFilter, handleChange }) => {
  return (
    <div>
      find countries
      <input type="text" value={countryFilter} onChange={handleChange} />
    </div>
  );
};

const FilteredCountries = ({ countryFilter, countriesData, handleClick }) => {
  const filteredCountriesData = countriesData.filter((val) => {
    if (val.name.common.toLowerCase().includes(countryFilter.toLowerCase())) {
      return true;
    }
    return false;
  });

  return (
    <div>
      {filteredCountriesData.length > 10 ? (
        "Too many matches, specify another filter"
      ) : filteredCountriesData.length === 1 ? (
        <CountryData countryData={filteredCountriesData[0]} isHidden={false} />
      ) : (
        <div>
          {filteredCountriesData.map((countryData) => (
            <div key={countryData.name.common}>
              {countryData.name.common}
              <ShowButton countryData={countryData} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CountryData = ({ countryData, isHidden }) => {
  return isHidden ? (
    <></>
  ) : (
    <div>
      <h1>{countryData.name.common}</h1>
      <br />
      <div>capital {countryData.capital[0]}</div>
      <div>area {countryData.area}</div>
      <br />
      <br />
      <h2>languages:</h2>
      {
        <ul>
          {Object.values(countryData.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
      }
      <br />
      <br />
      <img
        src={countryData.flags.png}
        alt={`Flag of ${countryData.name.common}`}
      />
      <br />
      <Weather
        name={countryData.capital[0]}
        lat={countryData.capitalInfo.latlng[0]}
        lon={countryData.capitalInfo.latlng[1]}
      />
    </div>
  );
};

const ShowButton = ({ countryData }) => {
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <>
      <button onClick={handleClick}>{visible ? "hide" : "show"}</button>
      <div>
        <CountryData countryData={countryData} isHidden={!visible} />
      </div>
    </>
  );
};

const Weather = ({ name, lat, lon }) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [temp, setTemp] = useState("");
  const [wind, setWind] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        setTemp(response.data.main.temp);
        setWind(response.data.wind.speed);
        setIcon(response.data.weather[0].icon);
      });
  }, [apiKey, lat, lon]);

  return (
    <div>
      <h1>Weather in {name}</h1>
      <div>temperature {temp} Celcius</div>
      <div>
        {icon.length > 1 ? (
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="weather icon"
          />
        ) : (
          <></>
        )}
      </div>
      <div>temperature {wind} m/s</div>
    </div>
  );
};

export default App;
