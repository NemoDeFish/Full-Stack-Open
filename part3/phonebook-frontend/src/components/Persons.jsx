const Persons = ({ personsToShow, deleteName }) => 
  personsToShow.map((person) => 
    <div key={person.name}>
      {person.name} {person.number} <button onClick={() => deleteName(person.id, person.name)}>delete</button>
    </div>)

export default Persons