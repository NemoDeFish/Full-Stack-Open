const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('not enough arguments')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://nemodefish:${password}@cluster0.jjraegi.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const peopleSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', peopleSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(people => {
      console.log(people.name, people.number)
    })
    mongoose.connection.close()
  })
} else {
  const people = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  people.save().then(() => {
    console.log('added', people.name, 'number', people.number, 'to phonebook')
    mongoose.connection.close()
  })
}

