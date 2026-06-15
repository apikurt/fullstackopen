import Person from "./Person";
import personService from "../services/persons";

const Results = ({ persons, setPersons, search }) => {
  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.delete(person.id).then(() => {
        console.log(`Deleted person with id ${person.id}`);
        personService.getAll().then((response) => {
          setPersons(response.data);
        });
      });
    }
  };
  return (
    <div>
      <h2>Numbers</h2>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase()),
        )
        .map((person) => (
          <Person key={person.id} person={person} handleDelete={handleDelete} />
        ))}
    </div>
  );
};

export default Results;
