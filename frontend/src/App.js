import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Video from './pages/Video';
import Aside from './components/Aside';
import Services from './pages/Services';
import Language from './components/Language';
import Login from './pages/Login';
import I18nProvider from './i18n/Provider';
import { useLanguageContext } from './ContextAPI/LanguageProvider';
import Register from './pages/Register';
import Store from './pages/Store';

function App() {
  const language = useLanguageContext()[0];

  // setTimeout(() => {
  //   document.querySelector('.app').classList.remove('app-anim');
  //   document.querySelector('.intro').classList.add('d-none');
  // }, 6100);

  return (
    <div>
      {/* <div className="intro">
        <Video />
      </div> */}

      {/* <div className="app app-anim"> */}
      <div className="app">
        <Language />
        <I18nProvider locale={language}>
          <Aside />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/services" component={Services} />
            <Route path="/store" component={Store} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </I18nProvider>
      </div>
    </div>
  );
}

export default App;
