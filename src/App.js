import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Video from './pages/Video';
import Aside from './components/Aside';
import Services from './pages/Services';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Language from './components/Language';

function App() {
  /*    setTimeout(() => {
 document.querySelector('.app').classList.remove('app-anim');
    document.querySelector('.intro').classList.add('d-none');
  }, 6000); */

  return (
    <div>
      {/* <div className="intro">
        <Video />
      </div> */}
      <div className="app">
        <Navbar />
        <Aside />
        <Language />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/services" component={Services} />
          {/* <Route path="/video" component={Video} /> */}
        </Switch>
        <Footer />
      </div>
    </div>
  );
}

export default App;
