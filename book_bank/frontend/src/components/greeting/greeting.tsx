import React from 'react';
import {Link} from 'react-router-dom';

const Greeting = () => {
  return(
    <div>
      <h1>Welcome to the Book Bank</h1>
      <h2>
      <Link to ="/books">Click here to View a List of Our Favorite Books</Link>
      </h2>


    </div>
  )
}

export default Greeting;
