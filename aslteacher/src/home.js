import React,{ Component ,ReactComponent } from "react";
import './index.css';
import icon from "./resources/favicon.ico";
import {   ReactComponent as TestImage  } from './Images/testImage.svg';
import {   ReactComponent as World  } from './Images/world2.svg';
import {   ReactComponent as Shirt  } from './Images/casual-t-shirt.svg';
import {   ReactComponent as Tiger  } from './Images/tiger.svg';
import {   ReactComponent as Man  } from './Images/man.svg';
import {   ReactComponent as Burger  } from './Images/burger.svg';
import {   ReactComponent as College } from './Images/open-book.svg';
import { videos } from "./resources/videosSource";

import LearningPage from "./learningPage"
import Test from "./test"
import LevelsMenu from "./levelsMenu";

const levelName=["testCloth","testAnimales","testActions","testFood"]
const buttonLevelTitle1 =["Clothes","Animals","Actions","Food"]
const buttonLevelTitle =[<Shirt />,<Tiger />,<Man/>,<Burger/>]


class Home extends Component {


  constructor(props)
  {
    super(props);

    this.renderLearningPage = this.renderLearningPage.bind(this)
    this.renderHome = this.renderHome.bind(this)
    this.backHome = this.backHome.bind(this)
    this.goTest = this.goTest.bind(this)
    this.onBackHome = this.onBackHome.bind(this)
    this.changeLearningPage = this.changeLearningPage.bind(this)
    this.renderTestPage = this.renderTestPage.bind(this)
    this.state = {currentPage:-1,videosTest :null,indexLevel:-1}
  }
  

  onBackHome()
  {
    this.setState({currentPage:-1})
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
    
    this.setState({currentPage:1})
  }

 
  renderTestPage()
  {
    return (<LevelsMenu BackHome={this.onBackHome}/>)
  }

  renderHome()
  {
    return(
    
      <div>        
      <World className="WorldLogo"/>
      
     
      <div style={{contentAligment:"center"}}>
      <h1>Learn ASL easily and fun</h1>
      <h3> Click on the book to start learn</h3>
       <br/>
       <br/>
      
    

        

      <div className="divBook">
            
      <button  className="transparentButton"  onClick={(event)=>this.changeLearningPage()}><College/></button> 
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
      case 1:
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