import React,{ Component } from "react";
import './index.css';

import { videos } from "./resources/videosSource";
import axios from 'axios';
import MediaStreamRecorder from 'msr';
import {   ReactComponent as Reply  } from './Images/reply.svg';
import {   ReactComponent as College } from './Images/open-book.svg';
import {   ReactComponent as Play } from './Images/youtube-play-button.svg';

const RECORDING_ERROR = "Unable to capture your camera. Please check console logs.";
const MINE_TYPE = "video/mp4";
const PORT_PATH = 'http://localhost:5000/';
const RECORDING_TIME = 3000;


class App extends Component {  
  constructor(props){
    super(props);
    this.state = {current:0,videoVis:"hidden",playVis:"visible"}
    this.video={};
    this.videos = this.props.videos;
    this.videoHeight = 0;
    this.stream=null;   
    this.mediaRecorder=null;
    this.bindFunctions = this.bindFunctions.bind(this);
    this.afterStartRecordingClick = this.afterStartRecordingClick.bind(this)
    this.bindFunctions();   
  }

  bindFunctions()
  {
    this.afterStartRecordingClick = this.afterStartRecordingClick.bind(this);
    this.openClientCaptureVideoOnScreen = this.openClientCaptureVideoOnScreen.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.sendingDataToServer = this.sendingDataToServer.bind(this);
  }

  afterStartRecordingClick(event) {
    this.setState({playVis:"hidden",videoVis:"visible"}) 
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
    this.stream = stream;
    this.mediaRecorder = new MediaStreamRecorder(this.stream);
    this.mediaRecorder.mimeType = MINE_TYPE;
    this.mediaRecorder.ondataavailable = function(blob)
    {
      let reader = new FileReader();
      reader.onload = function(){
      this.sendingDataToServer(reader.result,this.props.testName)
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


sendingDataToServer(data,testName)
{
  const {current} = this.state
  axios.post(PORT_PATH+testName,{data}).then(function (res){
    this.setState({current: (current + 1) % 4});

    if(res!==current){
      alert("You wrong !");
    }
    else
    {
      alert("You right !");
    }
    
  }.bind(this))
}

 openClientCaptureVideoOnScreen()
  {
    
    this.video = document.querySelector('video');
    this.video.muted = true;
    this.video.volume = 0;
    this.video.height = 500;
    this.video.srcObject = this.stream;    
  }

   stopRecording(){
    
    console.log(this.video.height)
    this.videoHeight = Number(this.video.height);
        this.stream.stop() 
    this.mediaRecorder.stop()
    this.video.height = 0;
    this.setState({playVis:"visible",videoVis:"hidden"}) 
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
                  <h1 >Make the sign for : {this.videos[current].key}</h1> 

                  <h3 style={{visibility :this.state.playVis}}>Press on the play button to film yourself</h3>   
                </tr>
              <tr>
              
                  <video style={{visibility :this.state.videoVis}} controls autoPlay playsInline></video>
              </tr>
                <tr>
                 
                  <button className = "transparentButton" style={{visibility :this.state.playVis}}  onClick={this.afterStartRecordingClick}><Play/></button>
            </tr>
            </td>
            </tr>
            </table> 

           

          
                <button  float="left" className = "transparentButton"   onClick={(event)=>{onBackLearningPage(this.props.indexLevel)}}><Reply/></button>
                
                <button  float="right"className = "transparentButton"   onClick={(event)=>onClickBackHome()}><College/></button>
              
             
       

             
          
           
         

              

              
                 
      </div>
    );
  }
}

export default App;