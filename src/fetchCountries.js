export const fetchCountries = nameCountry => {
  return fetch(
    `https://restcountries.com/v3.1/name/${nameCountry}?fields=name,capital,flags,population,languages`,
  ).then(res => {
    return res.json();
  });
};
