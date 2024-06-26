import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

const App = () => {
  return (
    <>
      <NoteState>
        <Router>
          {/* <Alert message="This is a message!" /> */}
          <Navbar title='iNotebook' />

          <div className="container">
            <Switch>

              <Route exact path="/">
                <Home />
              </Route>

              <Route exact path="/about">
                <About />
              </Route>

            </Switch>
          </div>

        </Router>
      </NoteState>
    </>
  );
}

export default App;