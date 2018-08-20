import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './Books.js'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'

class SearchBooks extends Component {
  state = {
    query:''
  }

	updateQuery (query) {
		this.setState({ query: query.trim() });
	 }

  render() {
    return (
    	<div className="search-books">
        <div className="search-books-bar">
        <Link to="/" className="close-search">Back</Link>
          <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input type="text"
            placeholder="Search by title or author"
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          </div>
        </div>
        <div className="search-books-results">
          {/*
            Creates a grid with books for any result larger than one
          */}
          {Book.length ===0 ?(<div>No match</div>):(<ol className="books-grid">
          {Book.map((book) => (
            <li key= {book.id}>
            <Book
              book={book}
              updateShelf={this.props.updateShelf}
              />
            </li>
          ))}
          </ol>)}
        </div>
      </div>
    )
  }
}
export default SearchBooks
