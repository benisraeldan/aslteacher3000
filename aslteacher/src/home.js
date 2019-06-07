import React,{ Component } from "react";
import './index.css';
import icon from "./resources/favicon.ico";

import { videos } from "./resources/videosSource";

import LearningPage from "./learningPage"
import Test from "./test"

class Home extends Component {


  constructor(props)
  {
    super(props);
    this.renderLearningPage = this.renderLearningPage.bind(this)
    this.renderHome = this.renderHome.bind(this)
    this.backHome = this.backHome.bind(this)
    this.goTest = this.goTest.bind(this)
    this.changeLearningPage = this.changeLearningPage.bind(this)
    this.renderTestPage = this.renderTestPage.bind(this)
    this.state = {currentPage:-1,videosTest :null,indexLevel:-1}
  }
  


  renderLearningPage()
  {
    return ( <LearningPage videos = {videos[this.state.currentPage]} level={this.state.currentPage + 1} onClickBackHome ={this.backHome} onClickGoTest={this.goTest}/>)
  }

  backHome(event)
  {
    this.setState({currentPage:-1,indexLevel:-1,videosTest:null})
  }

  goTest(videosTest,indexLevel)
  {
    this.setState({currentPage:5,videosTest:videosTest,indexLevel:indexLevel})
  }

  changeLearningPage(index)
  {
    
    this.setState({currentPage:index})
  }

 
  renderTestPage()
  {
    return ( <Test videos = {this.state.videosTest} indexLevel = {this.state.indexLevel} onClickBackHome ={this.backHome} onBackLearningPage={(index)=>this.changeLearningPage(index)} />)
  }

  renderHome()
  {
    return(
    
      <div>        
      <img src={icon} alt="logo" />
      <div style={{contentAligment:"center"}}>
      <h3>Learn ASL for free</h3>
        <br/>
        <div style={{contentAligment:"center" ,padding:"20px"}}>
        {videos.map((video,index)=>{
          return (<button className="button"  onClick={(event)=>this.changeLearningPage(index)}>{index+1}</button>)
        })}
        
        </div>
      </div>                
       </div>)
    
  }

  render() {
    const {currentPage} = this.state;

    switch(currentPage)
    {
      case -1:
      {
        return this.renderHome()
        break;
      }
      case 5:
      {
        return this.renderTestPage()
        break;
      }
      default:
      {
        return this.renderLearningPage()
        break;
      }
    
    }
  }
}

export default Home;