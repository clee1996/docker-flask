import React from 'react';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import Greeting from './greeting/greeting'
import Books from './book_list/books'
import Form from './post_book/form_book_page'
import UserSession from './user_ui/user_form'
import Homepage from './homepage/homepage'
import {AuthProvider} from './context/index.js'
import {ProtectedRoute} from './context/routes_util.js'

const App = () => {
  return(
    <div>
      <AuthProvider>
      <Router>
        <Route exact path="/"><Homepage/></Route>
        <Route exact path="/books"><Books/></Route>
        <ProtectedRoute path="/formforbooks" component={Form}/>
        <Route exact path="/entry"><UserSession/></Route>
        <ProtectedRoute path="/greeting" component={Greeting}/>
      </Router>
      </AuthProvider>
    </div>
  )
}

export default App
