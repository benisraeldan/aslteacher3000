import React,{ Component } from "react";
import '../../index.css';
import icon from "../../resources/favicon.ico";
import { Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>        
          <img src={icon} alt="logo" />
          <div>
          Learn ASL for free
          <div className="ChooseLevel">
            Choose Level> 
          </div>  
            <br/>
            <div>
            <Link to="/level/1" className="button">1</Link>
            <Link to="/level/2" className="button">2</Link>
            <Link to="/level/3" className="button">3</Link>
            <Link to="/level/4" className="button">4</Link>
            
            </div>
          </div>                
      </div>
    );
  }
}

export default App;