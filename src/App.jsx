import logo from './logo.svg';
import Ticker from "./components/Ticker";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {/* Edit <code>src/App.jsx</code> and save to reload. */}
        </p>
        <Ticker />
      </header>
    </div>
  );
}

export default App;
