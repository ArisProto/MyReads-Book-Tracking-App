import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Books'

class BookSearch extends Component {
  state = {
    query: '',
    showingBooks: [],
  }

  updateQuery = (query) => {
    this.setState({ query })
    if (this.state.query) {
      BooksAPI.search(query).then((qBooks) => {
        if (qBooks instanceof Array) {
          qBooks.forEach( qBook => {
            qBook.shelf = 'none'
            this.props.books.map( (libraryBook) => {
              if (libraryBook.id === qBook.id) {
                qBook.shelf = libraryBook.shelf
              }
              return qBook
            })
          })
          this.setState({ showingBooks: qBooks})
        } else {
          this.setState({ showingBooks: []})
        }
      })
    } else {
      this.setState({ showingBooks: []})
    }
  }

  render() {
    const { query, showingBooks } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Return to Home Page</Link>
          <div className="search-books-input-wrapper">
            <input
              autoFocus="true"
              type="text"
              placeholder="Search by category"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">

          <ol className="books-grid">
          {query && showingBooks.map( (book) => (
            (book.imageLinks) ?
            <Book book={book} shelfStatus={book.shelf} title={book.title} author={book.authors} img={book.imageLinks.thumbnail} key={book.id} updatingShelf={this.props.updatingShelf}/>
            :
            <Book book={book} shelfStatus={book.shelf} title={book.title} author={book.authors} key={book.id} updatingShelf={this.props.updatingShelf}/>
          ))}
          </ol>

        </div>
      </div>
    )
  }
}

export default BookSearch;
