import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'

class Book extends Component {
    state = {
 books: [],
}

  componentDidMount() {
    BooksAPI.getAll().then((books)=>{
          this.setState({books: books})}
    ) }

 updateShelf=  (book, shelf) =>
    { 
      BooksAPI.update(book, shelf)
      .then(resp => {book.shelf = shelf;
        this.setState(props=> ({ //change shelf of books
          books: props.books.filter((b)=> b.id !== book.id).concat(book) ,
          value: this.currentShelf //filter through books- concat those not there
        }))})}  

  render() {

        return (
          <div className="book">
            <div className="book-top">
             <span>{this.props.book.description || "No Description avaliable"}</span>
              <div className="book-cover" style={{ width: 128, height: 188, 
                backgroundImage: `url("${ this.props.book.imageLinks.thumbnail || "" }")` }}></div> {/*//display image thumbnail or blank - same format for title/author/rating*/}
              <div className="book-shelf-changer">
                <select value={this.props.currentShelf } onChange=
                                {e =>this.props.updateShelf(this.props.book, e.target.value)}>
                  <option value="move" disabled>Move to...</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="read">Read</option>
                {/*  <option value="didNotFinish">Did Not Finish</option>*/}
                  <option value="none">None</option>
                </select>
              </div>
              </div>
            <div className="book-title">{this.props.book.title || "Title Not Found"}</div>
            <div className="book-authors">{this.props.book.authors || "Author Not Found"}</div>
            <div className="average-rating">{this.props.book.averageRating || "No Rating"}</div>
          </div>
        ) } }
        
export default Book;
