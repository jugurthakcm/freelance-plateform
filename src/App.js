import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Video from './pages/Video';
import Aside from './components/Aside';
import Services from './pages/Services';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Language from './components/Language';
import Translate from './pages/Translate';
import Provider from './i18n/Provider';
import { useLanguageContext } from './ContextAPI/LanguageProvider';

function App() {
  const languageContext = useLanguageContext()[0];
  const languageStorageItem = localStorage.getItem('language');
  const { language } = languageStorageItem
    ? JSON.parse(localStorage.getItem('language'))
    : languageContext;

  /* setTimeout(() => {
    document.querySelector('.app').classList.remove('app-anim');
    document.querySelector('.intro').classList.add('d-none');
  }, 6900); */

  return (
    <div>
      {/* <div className="intro">
        <Video />
      </div> */}

      <div className="app">
        <Language />
        <Provider locale={language}>
          <Navbar />
          <Aside />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/services" component={Services} />
            <Route path="/translate" component={Translate} />
          </Switch>
          <Footer />
        </Provider>
      </div>
    </div>
  );
}

export default App;
