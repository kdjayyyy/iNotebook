import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

const App = () => {
  return (
    <>
      <Router>
        <Navbar title='iNotebook' />

        <Switch>

          <Route path="/">;
            <Home />
          </Route>

          <Route exact path="/about">
            <About/>
          </Route>

        </Switch>

      </Router>
    </>
  );
}

export default App;
