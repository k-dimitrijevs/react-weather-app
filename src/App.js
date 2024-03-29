import './App.css';
import Weather from './Weather';

function Header() {
  return (
    <header>
      <h1 className="text-3xl font-bold text-teal-400">Simple Weather App with React</h1>
    </header>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <Weather />
    </div>
  );
}

export default App;
