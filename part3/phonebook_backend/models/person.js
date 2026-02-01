import mongoose from 'mongoose'

const numberValidator = (number) => {
  const regex = /^\d{2,3}-\d+$/
  return regex.test(number)
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: numberValidator,
      message: () => 'invalid! Format must be XX-XXX... or XXX-XXX...'
    }
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

export default Person
