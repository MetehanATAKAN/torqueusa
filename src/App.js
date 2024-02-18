import './styles/reset.css';
import './styles/global.css';
import './App.css'
import Header from './components/Header/header';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <div className="container">
      <Header/>
      <HomePage/>
    </div>
  );
}

export default App;
