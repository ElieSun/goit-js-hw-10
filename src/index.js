import './css/styles.css';
import {fetchCountries} from './fetchCountries.js';
import debounce from 'lodash.debounce';
import {Notify} from 'notiflix';

const DEBOUNCE_DELAY = 300;

const countryInfo = document.querySelector(".country-info");
const searchCountries = document.querySelector("#search-box");

searchCountries.addEventListener("input", debounce(onSearch, DEBOUNCE_DELAY))

function onSearch (event) {
    let country = this.value.trim();
        
    if (country === '') {
        return ;
    }
    let info = fetchCountries(country)
    .then(data => displayCountryList(data))
    // .catch(err => console.log(err));
    .catch(()=>{
        Notify.failure("Oops, there is no country with that name")
    })
}

function onSuccess(response) {
    clear(searchCountries);
    clear(countryInfo);
    Notify.info("Too many matches found. Please enter a more specific name.")
}
function onError (err) {
    clear(searchCountries);
    clear(countryInfo);
    Notify.warning("Oops, there is no country with that name")
}

function displayCountryList(countries)
{
    length = countries.length
    if (length === 1) {
        const markup = countries.map((country) => {
        language = Object.values(country.languages).join(', ')
          return `<li>
              <div><img src='${country.flags.svg}' alt='flag'><span>${country.name.official}<span></div> 
              <p><b>Capital</b>: ${country.capital}</p>
              <p><b>Population</b>: ${country.population}</p>
              <p><b>Languages</b>: ${language}</p>
            </li>`;
        })
        .join('');
        countryInfo.innerHTML = markup;
    } else if (length > 1 && length <= 10) {
        const markup = countries.map((country) => {
          return `<li>
              <div><img src='${country.flags.svg}' alt='flag'><span>${country.name.official}<span></div> 
            </li>`;
        })
        .join('');
        countryInfo.innerHTML = markup;
    } else if (length > 10) {
        return onSuccess()
    }
}

function clear(name) {
    return name.innerHTML = '';
} 