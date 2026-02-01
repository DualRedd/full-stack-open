import mongoose from "mongoose"

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@sandboxcluster.ykv99l6.mongodb.net/phonebook?appName=SandboxCluster`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('Phonebook entries:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
else {
  if (process.argv.length !== 5) {
    console.log('Usage: node mongo.js <password> <name> <number>')
    process.exit(1)
  }

  const name = process.argv[3]
  const number = process.argv[4]
  const newPerson = new Person({ name, number })

  newPerson.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
