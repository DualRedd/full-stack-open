import User from "../models/user.js"

const initialUsers = [
  {
    username: 'root',
    name: 'Superuser',
    password: 'sekret'
  },
  {
    username: 'johndoe',
    name: 'John Doe',
    password: 'password123'
  },
  {
    username: 'janedoe',
    name: 'Jane Doe',
    password: 'mypassword'
  }
]

const getAllUsers = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const getNonExistingId = async () => {
  const user = new User({ username: 'tempuser', name: 'Temp User', passwordHash: 'temphash' })
  await user.save()
  await user.deleteOne()
  return user._id.toString()
}

export default { initialUsers, getAllUsers, getNonExistingId }
