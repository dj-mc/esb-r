import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface ICountry {
  area: number;
  capital: string;
  name: {
    common: string;
    official: string;
  };
  languages: Record<string, string>;
  flags: {
    png: string;
  };
}

type TCountryList = ICountry[];

const CommonOfficial = (props: { country: ICountry }) => {
  const { common, official } = props.country.name;
  if (common === official) return <>{common}</>;
  else
    return (
      <>
        {common}
        <br />
        Officially: {official}
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

const Languages = (props: { country: ICountry }) => {
  const language_list: string[] = [];
  const { languages } = props.country;
  Object.keys(languages).map((lang: string) => {
    language_list.push(languages[lang]);
  });
  return (
    <>
      {language_list.map((lang: string, idx: number) => (
        <li key={idx}>{lang}</li>
      ))}
    </>
  );
};

const RenderSearch = (props: { countries: TCountryList }) => {
  const { countries } = props;
  if (countries.length === 1) {
    const found_country: ICountry = countries[0];
    return (
      <>
        <h2>
          <CommonOfficial country={found_country} />
        </h2>
        <img
          src={found_country.flags.png}
          alt={`Flag of ${found_country.name.common}`}
        ></img>
        <p>
          Area: {found_country.area.toLocaleString('en-US')} km<sup>2</sup>
          <br />
          Capital: {found_country.capital}
          <br />
          Languages:
          <ul>
            <Languages country={found_country} />
          </ul>
        </p>
      </>
    );
  } else return <MakeCountryLi countries={countries} />;
};

const SearchResults = (props: { search: string; countries: TCountryList }) => {
  const { search, countries } = props;
  const searched_countries: TCountryList = [];

  for (const country of countries) {
    const common = country.name.common.toLowerCase();
    const official = country.name.official.toLowerCase();
    const found_common = common.includes(search.toLowerCase());
    const found_official = official.includes(search.toLowerCase());

    if (search.length > 0 && (found_common || found_official)) {
      // Top 10 possible matches
      // Please provide more specific search term
      if (searched_countries.length < 10) searched_countries.push(country);
    }

    if (search.toLowerCase() === (common || official)) {
      // Found exact match
      // Ensure searched_countries returns only exact match
      while (searched_countries.length > 0) searched_countries.pop();
      searched_countries.push(country);
      break;
    }
  }

  return <RenderSearch countries={searched_countries} />;
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
        <SearchResults search={search} countries={countries} />
      </ul>
    </>
  );
};
