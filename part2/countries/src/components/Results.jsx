import { useState } from "react";

import Country from "./Country";

const ListItem = ({ country }) => {
  const [showDetails, setShowDetails] = useState(false);
  const handleClick = () => {
    setShowDetails(!showDetails);
  };
  return (
    <>
      <li key={country.cca3}>
        {country.name.common}{" "}
        <button onClick={handleClick}>show details</button>
      </li>
      {showDetails && <Country country={country} />}
    </>
  );
};

const Results = ({ countries, search }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase()),
  );
  if (search === "") {
    return <p>Type a country name to search.</p>;
  }

  if (filteredCountries.length === 0) {
    return <p>No countries found.</p>;
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return <Country country={country} />;
  } else if (filteredCountries.length <= 10) {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <ListItem key={country.cca3} country={country} />
        ))}
      </ul>
    );
  }
  return <p>Too many matches, specify another filter.</p>;
};

export default Results;
