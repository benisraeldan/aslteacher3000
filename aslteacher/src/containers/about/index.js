import React,{ Component } from "react";
import '../../index.css';
import icon from "../../resources/favicon.ico";
import { Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="centered">     
      <h1>level {this.props.match.params.id}</h1>
        <span className="LearnVideo">       
        <video height="250" width="250" controls autoPlay >
          <source src="../../resources/1/boots.mp4" type="video/mp4"/>
          Your browser does not support HTML5 video.
        </video>                                
        </span> 
        {/* <span>
        <video height="250" width="250" controls>
          <source src="C:\Users\gural\Desktop\תמונות מתאילנד\20180518_105136.mp4" type="video/mp4"/>
          Your browser does not support HTML5 video.
        </video>
        </span>
        <span className="LearnVideo">
          <video width="250" height="250" controls>
          <source src="C:\Users\gural\Desktop\תמונות מתאילנד\20180518_105136.mp4" type="video/mp4"/>
          Your browser does not support HTML5 video.
        </video>
        </span>
        <span className="LearnVideo">
        <video width="250" height="250" controls>
          <source src="C:\Users\gural\Desktop\תמונות מתאילנד\20180518_105136.mp4" type="video/mp4"/>
          Your browser does not support HTML5 video.
        </video>
        </span>         */}
        <Link to={"/level/" + this.props.match.params.id} className="button">1</Link>
      </div>
    );
  }
}

export default App;