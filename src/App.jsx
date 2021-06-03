import './App.css';
import Activities from './Components/Activities/Activities';

function App() {
  return (
    <main className="App">
      <div className="aside">
        {/* place clock, bus and food here */}
      </div>
      <div className="list">
        <Activities />
      </div>
    </main>
  );
}

export default App;
