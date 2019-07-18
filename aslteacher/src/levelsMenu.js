import React,{ Component ,ReactComponent } from "react";
import './index.css';
import icon from "./resources/favicon.ico";
import {   ReactComponent as TestImage  } from './Images/testImage.svg';
import {   ReactComponent as World  } from './Images/world2.svg';
import {   ReactComponent as Shirt  } from './Images/casual-t-shirt.svg';
import {   ReactComponent as Tiger  } from './Images/tiger.svg';
import {   ReactComponent as Man  } from './Images/man.svg';
import {   ReactComponent as Burger  } from './Images/burger.svg';
import { videos } from "./resources/videosSource";
import {   ReactComponent as Reply  } from './Images/reply.svg';

import LearningPage from "./learningPage"
import Test from "./test"

const levelName=["testCloth","testAnimales","testActions","testFood"]

const buttonLevelTitle =[{title:"Clothes",icon:<Shirt />},
                          {title:"Animals",icon:<Tiger />},
                          {title:"Actions",icon:<Man/>},
                          {title:"Food",icon:<Burger/>}]


class LevelsMenu extends Component {


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
    return ( <Test videos = {this.state.videosTest} indexLevel = {this.state.indexLevel} testName={levelName[this.state.indexLevel]} onClickBackHome ={this.backHome} onBackLearningPage={(index)=>this.changeLearningPage(index)} />)
  }

  renderHome()
  {
    return(
    
      <div>        
      
        <div style={{contentAligment:"center"}}>

        <h1>Categotries</h1>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
          <table align="center">
            <body>
            <tr>

            <div>        
            {videos.map((video,index)=>{

          return (
            <th>
            <div>
            
              <button className="transparentButton"  onClick={(event)=>this.changeLearningPage(index)}>
              <table>
                <tr>
                  <th>
                  {buttonLevelTitle[index].icon}
                  </th>
                </tr>
                <tr>
                  <th>
                  {buttonLevelTitle[index].title}
                  </th>
                </tr>
              </table>
              </button> 
            </div>
            </th>
           )
          
        })}
        </div>

        </tr>
        </body>
          </table>
        
        </div>

        <div style={{padding:"25px 0px 0px 0px"}}>
          
          <button className="transparentButton" onClick = {(event)=>this.props.BackHome()}><Reply/></button>
          </div>

      </div>           
      

 
      )
    
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

export default LevelsMenu;