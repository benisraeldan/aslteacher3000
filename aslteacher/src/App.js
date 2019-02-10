import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <img src="./resources/favicon.ico" alt="logo" />
          <div>
          Learn ASL for free
          <div className="ChooseLevel">
            Choose Level> 
          </div>  
            <br/>
            <div>
            1 2 3 4
            </div>
          </div>          
        </header>
      </div>
    );
  }
}

export default App;
