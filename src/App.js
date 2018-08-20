import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import HomePage from './HomePage.js'
import SearchBooks from './SearchBooks.js'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
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
