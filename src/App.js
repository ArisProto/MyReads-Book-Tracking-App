import React, { Component } from 'react'
import './App.css';
import HomePage from './HomePage'
import BookSearch from './BookSearch'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'

class BooksApp extends Component {
  state = {

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

  updatingShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.loadBook()
    })
  }

  render() {
    return (
      <div className="app">

        <Route path="/search" render={() => (
          <BookSearch
            updatingShelf={this.updatingShelf}
            books={this.state.books}
          />
        )}/>

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
