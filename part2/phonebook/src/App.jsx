import { useState, useEffect } from "react";

import personService from "./services/persons";

import Search from "./components/Search";
import AddForm from "./components/AddForm";
import Results from "./components/Results";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notification, setNotification] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        personService
          .update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then((response) => {
            setNotification(`Updated ${newName}`);
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            personService.getAll().then((response) => {
              setPersons(response.data);
            });
          }).catch((error) => {
            setIsError(true);
            setNotification(
              `Information of ${newName} has already been removed from server`,
            );
            setTimeout(() => {
              setNotification(null);
              setIsError(false);
            }, 5000);
          });
      }
      setNewName("");
      setNewNumber("");
      return;
    }

    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    setNewName("");
    setNewNumber("");

    personService.create(nameObject).then((response) => {
      setPersons(persons.concat(response.data));
      setNotification(`Added ${newName}`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={isError && "error"} />
      <Search search={search} handleSearchChange={handleSearchChange} />

      <AddForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <Results persons={persons} setPersons={setPersons} search={search} />
    </div>
  );
};

export default App;
