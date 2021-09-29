import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import './books.css'
import {useAuthState} from '../context/index.js'
import PacmanLoader from 'react-spinners/PacmanLoader'
import {cookieValue} from '../context/helperfuncs.js'

const Books = () => {

  const [listOfBooks, setListOfBooks] = useState([])
  const [fetchedStatus, setFetchedStatus] = useState(false)

  const user = useAuthState()
  const userid = user.userDetails.id

  useEffect(() => {
    const fetchListOfBooks = async () => {
      if (!fetchedStatus) {
      const res = await fetch(`http://localhost:5000/api/personbooks/${userid}`,
                              {credentials: 'include'})
      const data = await res.json()

      let arr:string[] = []
      for (let i = 0; i < data.books.length; i++) {
        arr.push(data.books[i])
      }

      setFetchedStatus(true)
      setListOfBooks(prev => [...prev, ...arr])
      }

    }
    fetchListOfBooks()
  })

  const handleClick = (event: any, id: any, idx: number) => {
    event.preventDefault()

    const deleteBook = async () => {
      await fetch(`http://localhost:5000/api/books/${id}`, {
        method: 'DELETE',
      headers: {'X-CSRF-TOKEN': cookieValue()},
      credentials: 'include'
      })
      setListOfBooks(listOfBooks.filter((item, index) =>
      index !== idx
      ))
    }
      deleteBook()
  }




if (fetchedStatus === false) {
  return <div className="spinner">
  <PacmanLoader/>
  </div>
}

  return(
    <div>
      <h1 className="edit-header">Edit or Delete a Book</h1>
      {listOfBooks.map((book, idx) => (
        <div className="individual-book" key={idx}>
          <div>{book.title}</div>
          <div>{book.author}</div>
          <div>{book.synopsis}</div>
          <Link to={{pathname: "/editformforbooks", state: {book: book}}}>Edit</Link>
          <button onClick={(event) => handleClick(event, book.id, idx)}>Delete</button>
        </div>
      ))}
    </div>


  )

}

export default Books;
