import './App.css';
import Navbar from './components/Navbar';
import { Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Route exact path="/" component={Home} />
    </div>
  );
}

export default App;
