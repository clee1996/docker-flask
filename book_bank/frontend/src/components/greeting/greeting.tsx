import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useAuthState, logout, useAuthDispatch} from '../context/index.js'
import './greeting.css'
type Book = {
  title: string;
  canonicalVolumeLink: string;
  imageLinks: {smallThumbnail: string}
}

type VolumeInfo = {
  volumeInfo: Book
}


const Greeting = () => {

  console.log(useAuthState())

  const history = useHistory()
  const dispatch = useAuthDispatch()
  const [info, setInfo] = useState<VolumeInfo[]>([])
  const [fetchingBooks, setFetchingBooks] = useState(true)

  useEffect(() => {

    const fetchInfo = async () => {
      if (fetchingBooks) {
      const response = await fetch("https://www.googleapis.com/books/v1/users/109771133625933164510/bookshelves/0/volumes?key=AIzaSyAmMhNJaRV1WpZciy6On46vefxALDOaGag")
      const data = await response.json()
      //declare types in typescript
      let arr:VolumeInfo[] = []

      //go through array of data and sort it using the information i need
      for (let i = 0; i < data.items.length; i++) {

        arr.push(data.items[i])
      }
      setFetchingBooks(false)
      setInfo(prev => [...prev, ...arr])


      }
      //cleanup
      setFetchingBooks(false)
    }

    fetchInfo()


  })

  const handleLogout = () => {
    logout(dispatch)
    history.push('/')

  }

  if (info.length < 1) {
  return null
  }



  return(
    <div>
      <h1 className="header">Welcome to the Book Bank</h1>
      <button onClick={handleLogout}>Logout Here</button>
        <h2 className = "sub-header-greeting">Random Recommended List of Books for your Pleasure!</h2>
      {info.map((books, idx) => (
        <div className="greeting-list-book" key ={idx}>
          <div>
          <div>{books.volumeInfo.title}</div>
          <a href={books.volumeInfo.canonicalVolumeLink}>CLick here for the Book</a>
          </div>
          <img src={books.volumeInfo.imageLinks.smallThumbnail}></img>
        </div>
      ))}
        <div className="link-tags">
         <h2 className="link-one">
           <Link to ="/books">Click here to View a List of Our Favorite Books</Link>
           <Link to={{pathname: "/entry", state: {formType: "login"}}}>Click here to Login</Link>
         </h2>
         <h2 className="link-two">
           <Link to={{pathname: "/entry", state: {formType: "signup"}}}>Click here to Signup</Link>
           <Link to ="/formforbooks">Click here to Add a Book</Link>
         </h2>
        </div>


    </div>
  )
}

export default Greeting;
