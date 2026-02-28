import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

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
  query getBooksAndGenres($genre: String) {
    books: allBooks(genre: $genre) {
      title
      author {
        name
        id
      }
      published
      genres
      id
    }
  }
`

export const GET_GENRES = gql`
  query {
    genres: allGenres
  }
`

export const GET_RECOMMENDED_BOOKS = gql`
  query {
    me {
      favoriteGenre
    }
    recommendedBooks {
      title
      author {
        name
        id
      }
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
      author {
        name
        id
      }
      published
      genres
      id
    }
  }
`
