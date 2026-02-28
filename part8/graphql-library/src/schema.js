const typeDefs = /* GraphQL */ `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int
    genres: [String!]!
    id: ID!
  }

  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    allGenres: [String!]!
    recommendedBooks: [Book!]!
  }

  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  
    addBook(
      title: String!,
      author: String!,
      published: Int,
      genres: [String!]
    ): Book

    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
  }
`

export default typeDefs;
