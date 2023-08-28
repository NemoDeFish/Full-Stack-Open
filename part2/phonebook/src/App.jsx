import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notifications'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [notification, setNotification] = useState('null')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const noteFind = persons.find((person) => person.name === newName)
    if (noteFind !== undefined) {
      updateName(noteFind.id)
    }
    else {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification(`Added ${newName}`)
        })
    }
    setTimeout(() => {
      setNotification("null")
    }, 5000)

    setNewName('')
    setNewNumber('')
    
  }

  const deleteName = (id, name) => {
    if (confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const updateName = id => {
    const person = persons.find(person => person.id === id)
    const changedPerson = { ...person, number: newNumber}

    if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      personService
        .update(id, changedPerson)
        .then(returnedPerson => setPersons(persons.map(person => person.id !== id ? person : changedPerson)))
        .catch(() => {
          setNotification(`Information of ${newName} has already been removed from server`)
          setPersons(persons.filter(person => person.id !== id))
        })
      setNotification(`Changed ${newName}'s number`)
      }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = newFilter === '' 
    ? persons 
    : persons.filter((person) => new RegExp(newFilter, "gi").test(person.name))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />

      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      
      <h3>Add a new</h3>

      <PersonForm 
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} 
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} deleteName={deleteName} />
    </div>
  )
}

export default App