import React,{ Component } from "react";
import './index.css';

import { videos } from "./resources/videosSource";
import axios from 'axios';
import MediaStreamRecorder from 'msr';

const RECORDING_ERROR = "Unable to capture your camera. Please check console logs.";
const MINE_TYPE = "video/mp4";
const API_UPLOADER_PATH = 'http://localhost:5000/uploader';
const RECORDING_TIME = 3000;


class App extends Component {  
  constructor(props){
    super(props);
    this.state = {current:0}
    this.video={};
    this.videos = this.props.videos;
    this.stream=null;   
    this.mediaRecorder=null;
    this.bindFunctions = this.bindFunctions.bind(this);
    this.bindFunctions();   
  }

  bindFunctions()
  {
    this.afterStartRecordingClick = this.afterStartRecordingClick.bind(this);
    this.openClientCaptureVideoOnScreen = this.openClientCaptureVideoOnScreen.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.sendingDataToServer = this.sendingDataToServer.bind(this);
  }

  afterStartRecordingClick(event) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
    this.stream = stream;
    this.mediaRecorder = new MediaStreamRecorder(this.stream);
    this.mediaRecorder.mimeType = MINE_TYPE;
    this.mediaRecorder.ondataavailable = function(blob)
    {
      let reader = new FileReader();
      reader.onload = function(){
      this.sendingDataToServer(reader.result)
      }.bind(this);
        reader.readAsDataURL(blob);
      }.bind(this)
      this.mediaRecorder.start();
      this.openClientCaptureVideoOnScreen();
      setTimeout(() =>this.stopRecording(),RECORDING_TIME);

    }.bind(this)).catch(function(error) {
        alert(RECORDING_ERROR);
    });
     
    
}


sendingDataToServer(data)
{
  axios.post(API_UPLOADER_PATH,{data}).then(function (res){
    console.log(res)
  })
}

 openClientCaptureVideoOnScreen()
  {
    this.video = document.querySelector('video');
    this.video.muted = true;
    this.video.volume = 0;
    this.video.srcObject = this.stream;
  }

   stopRecording(){
    const {current} = this.state
    this.stream.stop() 
    this.mediaRecorder.stop()
    this.setState({current: (current + 1) % 4});   
    }


  render() {

    const {current} = this.state;
    console.log((this.props.indexLevel))
    const {onBackLearningPage,onClickBackHome} = this.props
    
    return (
      <div>
        <table className="table">
              <tr>
              <td >
              <tr>
                  <h1>Make the sign for : {this.videos[current].key}</h1>   
                </tr>
              <tr>
                  <video controls autoPlay playsInline></video>
              </tr>
                <tr>
                 
                  <button className = "button"  style={{padding:"20px"}} onClick={this.afterStartRecordingClick}>Start Recording</button>
            </tr>
            </td>
            </tr>
            </table> 

            <div style={{padding:"20px"}}>
          
              <button className = "button"   onClick={(event)=>onClickBackHome()}>Home</button>
              <button className = "button"   onClick={(event)=>{onBackLearningPage(this.props.indexLevel)}}>Back to learning</button>

              
              </div>    
      </div>
    );
  }
}

export default App;