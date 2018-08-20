import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import HomePage from './HomePage.js'
import SearchBooks from './SearchBooks.js'

class BooksApp extends React.Component {
  state = {

    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app">
          <HomePage
            books={this.state.books}
            updateShelf={this.updateShelf}
          />

          <SearchBooks
          updateShelf={this.updateShelf}
          books={this.state.books}
          />

      </div>
    )
  }
}

export default BooksApp
