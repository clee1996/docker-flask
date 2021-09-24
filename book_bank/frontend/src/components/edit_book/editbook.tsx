import React from 'react'
import {useAuthState} from '../context/index.js'
import {useLocation, useHistory} from 'react-router-dom'

type Book = {
  author: string;
  id: number;
  person_id: number;
  synopsis: string;
  title: string;
}

interface stateType {
  book: Book
}


const EditForm = () => {
  const user = useAuthState()
  const location = useLocation()
  const state = location.state as stateType
  const {book} = state;

  const handleSubmit = (event: any) => {
    event.preventDefault()
    let data = {
      author: event.target.author.value,
      title: event.target.title.value,
      synopsis: event.target.synopsis.value
    }

    const submit = async () => {
      let newBookId = book.id.toString()
      let url = `http://localhost:5000/api/books/${newBookId}`
        console.log(url)
        await fetch(url, {
        method: "PATCH", body: JSON.stringify(data),
        headers: {Authorization: `Bearer ${user.token}`}
      })
    }
    submit()


  }

  return(
    <div>
      <h1 className="post-header">Edit this Book</h1>
      <form className="post-form" onSubmit={handleSubmit}>
        <label>Author:</label><input type="text" name="author" defaultValue={book.author}/>
        <label>Title:</label><input type="text"name="title" defaultValue={book.title}/>
        <label>Synopsis:</label><textarea name="synopsis" defaultValue={book.synopsis}/>
        <button className="button-form-label"type="submit">Submit</button>
      </form>
    </div>
  )


}


export default EditForm