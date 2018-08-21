import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Books'

class BookSearch extends Component {
  state = {
    query: '',
    showingBooks: []
  }

  updateQuery = (query) => {
    this.setState({ query })

    if (this.state.query) {
      BooksAPI.search(query)
      .then((queryBooks) => {
        if (queryBooks instanceof Array) {
          queryBooks.forEach( queryBook => {
            queryBook.shelf = 'none'
            this.props.books.map( (bookInLibrary) => {
              if (bookInLibrary.id === queryBook.id) {
                queryBook.shelf = bookInLibrary.shelf
              }
              return queryBook
            })
          })
          this.setState({ showingBooks: queryBooks})
        } else {
          this.setState({ showingBooks: []})
        }
      })
      .catch( error => console.log(error) )
    } else {
      this.setState({ showingBooks: []})
    }
  }

  render() {
    const { query, showingBooks } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
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
            <Book book={book} shelf={book.shelf} title={book.title} author={book.authors} img={book.imageLinks.thumbnail} key={book.id} changeShelf={this.props.changeShelf}/>
            :
            <Book book={book} shelf={book.shelf} title={book.title} author={book.authors} key={book.id} changeShelf={this.props.changeShelf}/>
          ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch;
