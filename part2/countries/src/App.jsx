import { useState, useEffect } from "react";
import countryServices from "./services/countryService";
import Results from "./components/Results";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryServices.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h1>Search: {search}</h1>
      <input value={search} onChange={handleSearchChange} />
      <Results countries={countries} search={search} />
    </div>
  );
}

export default App;
