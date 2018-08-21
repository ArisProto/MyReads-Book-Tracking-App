import React, { Component } from 'react'
import './App.css';
import HomePage from './HomePage'
import BookSearch from './BookSearch'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'

class BooksApp extends Component {
  state = {

    // List our books in an array to use later
    books: [],
  }

  componentDidMount() {
    this.loadBook()
  }

  loadBook = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  // update function is asynchronus, so we put the getAll() function inside of it so it executes after!
  updatingShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.loadBook()
    })
  }

  render() {
    return (
      <div className="app">

        // Use the router to route to a URL path (doesn't have to be exact)!
        <Route path="/search" render={() => (
          <BookSearch
            updatingShelf={this.updatingShelf}
            books={this.state.books}
          />
        )}/>

        // Use the router to route to an exact URL path!
        <Route exact path="/" render={() => (
          <HomePage
            updatingShelf={this.updatingShelf}
            books={this.state.books}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
