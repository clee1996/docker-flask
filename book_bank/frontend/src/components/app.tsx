import React from 'react';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import Greeting from './greeting/greeting'


const App = () => {
  return(
    <div>
      <Router>
      <Route exact path="/"><Greeting/></Route>
      <Route exact path="/books"></Route>
      </Router>
    </div>
  )
}

export default App
