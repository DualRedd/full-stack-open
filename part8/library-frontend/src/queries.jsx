import { gql } from '@apollo/client'

export const GET_AUTHORS = gql`
  query {
    authors: allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
      id
    }
  }
`

export const GET_BOOKS = gql`
  query {
    books: allBooks {
      title
      author
      published
      genres
      id
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int, $genres: [String!]) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author
      published
      genres
      id
    }
  }
`
