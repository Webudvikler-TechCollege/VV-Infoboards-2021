import './App.css';
import Activities from './Components/Activities/Activities';
import { GetCurrentDate } from './Components/Date/customDate';
import Menu from './Components/Menu/Menu';
import { Bus } from './Components/Bus/Bus'

function App() {
  return (
    <main className="App">
      <div className="aside">
        <GetCurrentDate/>
        <Menu/>
        <Bus/>
        <Weather/>
      </div>
      <div className="list">
        <Activities />
      </div>
    </main>
  );
}

export default App;
