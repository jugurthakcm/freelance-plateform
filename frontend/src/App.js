import { useEffect } from 'react';
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
import Dashboard from './pages/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './data/actions/userActions';
import Loading from './components/Loading';
import AddGig from './pages/gigs/AddGig';

function App() {
  const language = useLanguageContext()[0];
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    token && dispatch(loadUser(token));
  }, [token, dispatch]);

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
        {loading && loading.loading ? <Loading /> : null}
        <Language />
        <I18nProvider locale={language}>
          <Aside />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/services" component={Services} />
            <Route path="/store" component={Store} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/gig/add" component={AddGig} />
          </Switch>
        </I18nProvider>
      </div>
    </div>
  );
}

export default App;
