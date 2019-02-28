import React,{ Component } from "react";
import '../../index.css';
import { Link } from 'react-router-dom'
import { videos } from "../../resources/videos/index";

var video;

function stopRec(camera){
  camera.stop()    
  setTimeout(() => window.alert("you are wrong"),2000);    
}

class App extends Component {  
  constructor(props){
    super(props);
    this.state = {current:0}        
    this.startRec = this.startRec.bind(this);
    this.captureCamera = this.captureCamera.bind(this);
  }
  captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(camera) {
        callback(camera);
        setTimeout(() =>stopRec(camera),3000);      
    }).catch(function(error) {
        alert('Unable to capture your camera. Please check console logs.');
        console.error(error);
    });
    this.setState({current: this.state.current + 1 % 4});    
    console.log(this.state);
}
startRec(){
  video = document.querySelector('video');
    this.captureCamera(function(camera) {
        video.muted = true;
        video.volume = 0;
        video.srcObject = camera;
    });
}
  render() {
    return (
      <div>     
      <button id="btn-start-recording" onClick={()=>this.startRec()}>Start Recording</button>
  <hr/>
  <video controls autoPlay playsInline></video>

      <Link to="/" className="button">Home</Link>
      <Link to={"/level/" + this.props.match.params.id} className="button">Back to learning</Link>    
      <div className="button">
      <h4>Make the sign for: {videos[this.props.match.params.id - 1][this.state.current].key}</h4>      
      </div>
      </div>
    );
  }
}

export default App;