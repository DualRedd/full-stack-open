import jwt from 'jsonwebtoken'
import { GraphQLError } from 'graphql'
import Author from './models/author.js'
import Book from './models/book.js'
import User from './models/user.js'

const resolvers = {
  Author: {
    id: async (author) => author._id.toString(),
    bookCount: async (author) => Book.countDocuments({ author: author.id }),
  },
  Book: {
    id: async (book) => book._id.toString(),
    author: async (book) => Author.findById(book.author),
  },
  Query: {
    me: (_root, _args, { user }) => user,
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    allBooks: async (_root, args) => {
      const filter = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) return []
        filter.author = author._id
      }
      if (args.genre) {
        filter.genres = args.genre
      }
      return Book.find(filter)
    },
    allGenres: async () => {
      const genres = await Book.distinct('genres')
      return genres.sort()
    },
    recommendedBooks: async (_root, _args, { user }) => {
      if (!user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' }
        })
      }
      return Book.find({ genres: user.favoriteGenre })
    },
  },
  Mutation: {
    createUser: async (_root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      try {
        await user.save()
      } catch (error) {
        throw new GraphQLError(`Saving user failed: ${error.message}`, {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.username, error }
        })
      }
      return user
    },

    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },

    addBook: async (_root, args, context) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' }
        })
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError(`Saving author failed: ${error.message}`, {
            extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.author, error }
          })
        }
      }

      const book = new Book({
        title: args.title,
        author: author._id,
        published: args.published || null,
        genres: args.genres || [],
      })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError(`Saving book failed: ${error.message}`, {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.title, error }
        })
      }
      return book
    },
    editAuthor: async (_root, args, context) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' }
        })
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) return null

      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError(`Saving author failed: ${error.message}`, {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.name, error }
        })
      }
      return author
    },
  },
}

export default resolvers
