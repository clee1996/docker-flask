import React, {useEffect, useState} from 'react';
import './books.css'


const Books = () => {

  const [listOfBooks, setListOfBooks] = useState([])
  const [fetchedStatus, setFetchedStatus] = useState(false)

  useEffect(() => {
    const fetchListOfBooks = async () => {
      if (!fetchedStatus) {
      const res = await fetch("http://localhost:5000/api/books")
      const data = await res.json()
      let arr:string[] = []

      console.log(data)
      for (let i = 0; i < data.books.length; i++) {
        arr.push(data.books[i])
      }

      setFetchedStatus(true)
      setListOfBooks(prev => [...prev, ...arr])
      }

    }
    fetchListOfBooks()
  })



if (listOfBooks.length < 1) {
return null
}

  return(
    <div>
      <h1>Edit or Delete a Book</h1>
      {listOfBooks.map((book, idx) => (
        <div className="individual-book" key={idx}>
          <div>{book.author}</div>
          <div>{book.title}</div>
          <div>{book.synopsis}</div>
        </div>
      ))}
    </div>


  )

}

export default Books;
