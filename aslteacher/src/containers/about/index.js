import React,{ Component } from "react";
import '../../index.css';
import icon from "../../resources/favicon.ico";
import { Link } from 'react-router-dom'
import { videos } from "../../resources/videos/index";

class App extends Component {
  render() {
    return (
      <div className="centered">     
      <Link to="/" className="button">Home</Link>
      <h1>level {this.props.match.params.id}</h1>
        <span className="LearnVideo">             
        <video height="250" width="250" controls>        
          <source src={videos[this.props.match.params.id - 1][0].value} type="video/mp4"/>
          Your browser does not support HTML5 video.
        </video>                                
        </span> 
        <span>
        <video height="250" width="250" controls>
          <source src={videos[this.props.match.params.id - 1][1].value} type="video/mp4"/>
          Your browser does not support HTML5 video.
        </video>
        </span>
        <span className="LearnVideo">
          <video width="250" height="250" controls>
          <source src={videos[this.props.match.params.id - 1][2].value} type="video/mp4"/>
          Your browser does not support HTML5 video.
        </video>
        </span>
        <span className="LearnVideo">
        <video width="250" height="250" controls>
          <source src={videos[this.props.match.params.id - 1][3].value} type="video/mp4"/>
          Your browser does not support HTML5 video.
        </video>
        </span>        
        <br/>
        <br/>
        <Link to={"/test/" + this.props.match.params.id} className="button">Test</Link>
      </div>
    );
  }
}

export default App;