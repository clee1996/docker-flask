import React, {useState} from 'react'
import './form_book.css'

const Form = () => {

  const [formData, updateFormData] = useState({author: "", title: "", synopsis: ""})
  const [showPostStatus, updatePostStatus] = useState(false)


  const handleSubmit = (event: any) => {
    event.preventDefault();
    let url = 'http://localhost:5000/api/bookspost'
    let data = {author: event.target.author.value,
      title: event.target.title.value,
    synopsis: event.target.synopsis.value
    }

    fetch(url,
    {method: 'POST',
    body: JSON.stringify(data)}
         ).then(res => {
           updatePostStatus(true)
         })
  }




  return (
    <div>
      <h1 className="post-header">Put Your Favorite Books in Our Database!</h1>
      <form onSubmit={handleSubmit} className="post-form">
        <label>Author:</label><input type="text" name="author"></input>
        <label>Title:</label><input type="text" name="title"></input>
        <label>Synopsis:</label><textarea name="synopsis"></textarea>
        <button className = "button-form-label"type="submit">Submit</button>
        {showPostStatus ? <div>Success!</div> : null}
      </form>
    </div>
  )


}

export default Form;
