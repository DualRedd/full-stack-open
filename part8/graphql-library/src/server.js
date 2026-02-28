import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLError } from 'graphql'

import jwt from 'jsonwebtoken'
import User from './models/user.js'

import typeDefs from './schema.js'
import resolvers from './resolvers.js'

const getUserFromAuthHeader = (auth) => {
  if (!auth || !auth.toLowerCase().startsWith('bearer ')) return null
  try {
    const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
    return User.findById(decodedToken.id)
  } catch (error) {
    throw new GraphQLError('Invalid token', {
      extensions: { code: 'UNAUTHENTICATED' }
    })
  }
}

const startServer = (port) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  startStandaloneServer(server, {
    listen: { port },
    context: async ({ req }) => {
      const user = await getUserFromAuthHeader(req.headers.authorization)
      return { user }
    },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
}

export default startServer
