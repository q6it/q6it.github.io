import logo from './logo.svg';
import Ticker from "./components/Ticker";
import './App.css';
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     {/* <img src={logo} className="App-logo" alt="logo" /> */}
    //     <p>
    //       {/* Edit <code>src/App.jsx</code> and save to reload. */}
    //     </p>
    //   </header>
    // </div>
    <div>
      <Ticker />
    </div>
  );
}

export default App;
