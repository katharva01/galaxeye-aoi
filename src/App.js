
import './App.css';
import Component1 from './Component1';

function App() {
  return (
    <div className="App">
      <div>
        <p style={{fontWeight:"bolder"}}>Draw polygon on below map using controls present on right hand side of map</p>
        <p>Area in blue color : <b style={{color:"blue"}}>Your selected polygon</b></p>
        <p>Area in red color : <b style={{color:"red"}}>Tiles intersecting with your selected polygon</b></p>
      </div>
      <Component1/>
    </div>
  );
}

export default App;
