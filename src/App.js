import React, { useState } from 'react';
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import About from './components/About.js';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Login.js';
import Signup from './components/Signup.js';
const App = () => {
  const [alert,setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <div className="App">
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Switch>
              <Route exact path="/"><Home showAlert={showAlert} /></Route>
              <Route exact path="/About">
                <About/>
                </Route>
              <Route exact path="/login">
                <Login showAlert={showAlert}/>
                </Route>
              <Route exact path="/signup">
                <Signup showAlert={showAlert}/>
                </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
      {/* <h1>this is iNotebook</h1> */}
    </div>
  );
}

export default App;
