import { useState, useEffect } from "react";
import comms from "./services/Comms";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    comms.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleClick = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      comms.deleteId(id).then((response) => {
        let personsNew = persons.filter((val) => val.id !== id);
        setPersons(personsNew);
      });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const idxName = persons.findIndex((val) => val.name === newName);
    if (idxName !== -1) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        comms.update(persons[idxName].id, {name: newName, number: newNumber}).then(
          response => {
            let personsNew = [...persons];
            personsNew[idxName] = response;
            setPersons(personsNew);
          }
        );
      }
      return;
    }
    comms
      .create({
        name: newName,
        number: newNumber,
      })
      .then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
      });
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
      <Persons filteredPersons={filteredPersons} handleClick={handleClick} />
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

const Persons = ({ filteredPersons, handleClick }) => {
  const render = filteredPersons.map((person) => (
    <div key={person.id}>
      {`${person.name} ${person.number}`}
      <DeleteButton
        id={person.id}
        name={person.name}
        handleClick={handleClick}
      />
    </div>
  ));
  return render;
};

const DeleteButton = ({ id, name, handleClick }) => {
  return <button onClick={() => handleClick(id, name)}>delete</button>;
};

export default App;
