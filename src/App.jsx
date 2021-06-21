import './App.css';
import Activities from './Components/Activities/Activities';
import { GetCurrentDate } from './Components/Date/customDate';
import Menu from './Components/Menu/Menu';
import { News } from './Components/News/News';
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
      <div className="main-content">
        <div className="list">
          <Activities />
        </div>
        <div className="news">
          <News/>
        </div>
      </div>
    </main>
  );
}

export default App;
