import React,{ Component } from "react";
import '../../index.css';
import { Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="centered">     
      <Link to="/" className="button">Home</Link>
      <Link to={"/level/" + this.props.match.params.id} className="button">Back to learning</Link>
      {this.props.match.params.id}
      </div>
    );
  }
}

export default App;