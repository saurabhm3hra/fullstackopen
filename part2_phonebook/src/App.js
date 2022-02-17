import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const idx = persons.findIndex((val) => val.name === newName);
    if (idx !== -1) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons([
      ...persons,
      { name: newName, number: newNumber, id: persons.length + 1 },
    ]);
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filter} setFilter={setFilter} />
      <h3>add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

const Filter = ({ filterValue, setFilter }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        value={filterValue}
        onChange={(event) => setFilter(event.target.value)}
      />
    </div>
  );
};

const PersonForm = ({
  handleSubmit,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ filteredPersons }) => {
  const render = filteredPersons.map((person) => (
    <div key={person.id}>{`${person.name} ${person.number}`}</div>
  ));
  return render;
};

export default App;
