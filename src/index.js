import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'debounce';
import Notiflix from 'notiflix';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}50`;
}
const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const listOfCountries = document.querySelector('.country-list');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  let maxAmountOfCountries = document.querySelector('#max-country').value;
  let extraDetails = document.querySelector('#details').checked;
  const nameCountry = input.value.trim();
  if (nameCountry) {
    fetchCountries(nameCountry)
      .then(arrCountrys => {
        if (arrCountrys.length > maxAmountOfCountries) {
          listOfCountries.innerHTML = '';
          Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
        } else {
          const htmlEl = arrCountrys => {
            return arrCountrys.map((country, index, arrey) => {
              if (extraDetails == true || arrey.length === 1) {
                return `<li>
              <p>Country: <span class="name-official">${country.name.official}</span></p>
              <p>Capital: <span class="capital">${country.capital.join('')}</span></p>
              <div>Flag: <img class='flagImg' src="${country.flags.svg}" alt="Flag of the country" /></div>
              <p>Language: <span class="languages">${Object.values(country.languages).join(
                '',
              )}</span></p>
              <p>Population: <span class="population">${country.population}</span></p>
              </li>`;
              } else {
                return `<li>
                <div><img class='flagImg' src="${country.flags.svg}" alt="Flag of the country" /></div>
                <p><span class="name-official">${country.name.official}</span></p>
                </li>`;
              }
            });
          };
          listOfCountries.innerHTML = htmlEl(arrCountrys).join('');
        }
      })
      .catch(error => {
        listOfCountries.innerHTML = '';
        Notiflix.Notify.failure(`❌ Oops, there is no country with that name`);
      });
  } else {
    listOfCountries.innerHTML = '';
  }
}