import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface ICountry {
  name: {
    common: string;
    official: string;
  };
}

type TCountryList = ICountry[];

const CommonOfficial = (props: { country: ICountry }) => {
  const { common, official } = props.country.name;
  if (common === official) return <>{common}</>;
  else
    return (
      <>
        {common}, officially: {official}
      </>
    );
};

const MakeCountryLi = (props: { countries: TCountryList }) => {
  return (
    <>
      {props.countries.map((country: ICountry, idx: number) => (
        <li key={idx}>
          <CommonOfficial country={country} />
        </li>
      ))}
    </>
  );
};

const DisplaySearch = (props: { search: string; countries: TCountryList }) => {
  const { search, countries } = props;
  const searched_countries: TCountryList = [];

  countries.map((each: ICountry) => {
    const found_common = each.name.common
      .toLowerCase()
      .includes(search.toLowerCase());
    const found_official = each.name.official
      .toLowerCase()
      .includes(search.toLowerCase());
    if (search.length > 0 && (found_common || found_official)) {
      if (searched_countries.length < 10) searched_countries.push(each);
    }
  });

  return <MakeCountryLi countries={searched_countries} />;
};

export const Countries: React.FC = () => {
  const init_countries: TCountryList = [];
  const [countries, set_countries] = useState(init_countries);
  const [search, set_search] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      set_countries(response.data);
    });
  }, []);

  type TEvent = React.ChangeEvent<HTMLInputElement>;

  const input_change_search = (e: TEvent) => {
    set_search(e.target.value);
  };

  return (
    <>
      <h2>Countries</h2>
      Search:
      <input value={search} onChange={input_change_search} />
      <ul>
        <DisplaySearch search={search} countries={countries} />
      </ul>
    </>
  );
};
