
import './index.css';
import React,{Component} from 'react'




class LearningPage extends Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        console.log("LearningPage")
        const {onClickBackHome ,onClickGoTest,videos,level} = this.props;
        
        return (<div>
            <h1 className="Leveltitle">Level - {this.props.level}</h1>
            <table className="table">
                <tr>
            {videos.map((obj,index)=>{
              return (
              <td >
                  <tr>
                  <video height="250" width="250" controls>        
                    <source src={obj.value} type="video/mp4"/>
                        Your browser does not support HTML5 video.
                    </video>
                  </tr>
                  <tr>
                  <h3>{obj.key}</h3>
                  </tr>
             
             
              </td>
               )       
            })}
            </tr>

            <tr>
                
            </tr>
            </table>

            <div style={{padding:"25px 0px 0px 0px"}}>
            <table className="table">
                <tr>
                    <td>
                    <button className="button" onClick = {onClickBackHome}>Home</button>
                    </td>
                    <td>
                    <button className="button" onClick = {(event)=>onClickGoTest(videos,level-1)}>Test</button>
                    </td>
                </tr>
            </table>
            
            </div>

            </div>)
        
            
        
        

    }
} export default LearningPage;
