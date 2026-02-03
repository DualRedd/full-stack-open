import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const hash_password = async password => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  return passwordHash
}

const compare_password = async (password, hash) => {
  const result = await bcrypt.compare(password, hash)
  return result
}

const create_token = (object) => {
  return jwt.sign(
    object,
    process.env.SECRET,
    { expiresIn: 60 * 60 }
  )
}

export { hash_password, compare_password, create_token }
