import React, { Component } from 'react';
import './App.css';
import Board from './components/Board'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: ['', '', '', '', '', '', '', '', ''],
      nextPlayer: false,
      history: [],
    }
  }
  setParentState = (obj) => {
    this.setState(obj)
  }

  showPast = (item, index) => {
    console.log("whole history",this.state.history)
    this.setState({ squares: item.squares, nextPlater: item.nextPlayer, history: this.state.history.filter((i, e)=> e<= index)})
}

render() {

  if (this.props)

    return (
      <div> 
        <h1>Tic Tac Toe</h1>
        <ul>
          {
            this.state.history.map((item, index) => {
              return (<li><button onClick={() => this.showPast(item,index)} >go to move {index + 1}</button></li>)
            })
          }
        </ul>
        <Board squares={this.state.squares} nextPlayer={this.state.nextPlayer} history={this.state.history} setParentState={this.setParentState} />
      </div >
    );

}

}

export default App;

{/* <FacebookLogin
      // appId="1088597931155576"
      // autoLoad={true}
      // fields="name,email,picture"
      // onClick={componentClicked}
      // callback={responseFacebook} />, */}
