import './App.scss';
import Activities from './Components/Activities/Activities';
import { GetCurrentDate } from './Components/Date/customDate';
import Menu from './Components/Menu/Menu';
import { News } from './Components/news/News';
import { Bus } from './Components/Bus/Bus'
// import Weather from './Components/Weather/Weather'
import Img from './image/lol.png'

function App() {
  return (
    <main className="App">
      <aside>
          <div>
            <GetCurrentDate/>
          </div>

          <div>
            <Menu/>
          </div>
          
          <div>
            <Bus/>
          </div>
          
          {/* <Weather/> */}
      </aside>

      <section className="main-content">
        
        <div className="list">
          <Activities />
        </div>

        <div className="news">
          <News/>
        </div>

      </section>

    </main>
  );
}

export default App;
