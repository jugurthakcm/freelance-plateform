import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Video from './pages/Video';
import Aside from './components/Aside';

function App() {
  setTimeout(() => {
    document.querySelector('.app').classList.remove('app-anim');
    document.querySelector('.intro').classList.add('d-none');
  }, 6000);

  return (
    <>
      <div className="intro">
        <Video />
      </div>
      <div className="app app-anim">
        <Aside />
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route path="/video" component={Video} /> */}
        </Switch>
      </div>
    </>
  );
}

export default App;
