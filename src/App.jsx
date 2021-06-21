import './App.css';
import Activities from './Components/Activities/Activities';
import { GetCurrentDate } from './Components/Date/customDate';
import Menu from './Components/Menu/Menu';
import { Bus } from './Components/Bus/Bus'
// import Weather from './Components/Weather/Weather'
import Img from './image/lol.png'

function App() {
  return (
    <main className="App">
      <div className="aside">
          <GetCurrentDate/>
          <Menu/>
          <Bus/>
          {/* <Weather/> */}
      </div>
      <div className="list">
        <Activities />
      </div>
      <News/>
    </main>
  );
}

export default App;
