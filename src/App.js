import './App.css';
import Navbar from './components/Navbar';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Video from './pages/Video';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/video" component={Video} />
      </Switch>
    </div>
  );
}

export default App;
