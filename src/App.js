import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Video from './pages/Video';
import Aside from './components/Aside';

function App() {
  return (
    <div className="app">
      <Aside />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/video" component={Video} />
      </Switch>
    </div>
  );
}

export default App;
