import './App.css';
import Navbar from './components/Navbar';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Route exact path="/" component={Home} />
      <Footer />
    </div>
  );
}

export default App;
