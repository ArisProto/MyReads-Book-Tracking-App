import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css';
import HomePage from './HomePage'
import BookSearch from './BookSearch'

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

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.loadBook()
    })
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <HomePage
            books={this.state.books}
            changeShelf={this.changeShelf}
          />
        )}/>

        <Route path="/search" render={() => (
          <BookSearch
          changeShelf={this.changeShelf}
          books={this.state.books}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
