import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface ICountry {
  name: {
    common: string;
    official: string;
  };
}

type TCountryList = ICountry[];

const MakeCountryLi = (props: { countries: TCountryList }) => {
  return (
    <>
      {props.countries.map((country: ICountry) => (
        <li key={country.name.official}>{country.name.common}</li>
      ))}
    </>
  );
};

export const Countries: React.FC = () => {
  const init_countries: TCountryList = [];
  const [countries, set_countries] = useState(init_countries);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      set_countries(response.data);
    });
  }, []);

  return (
    <>
      <MakeCountryLi countries={countries} />
    </>
  );
};
