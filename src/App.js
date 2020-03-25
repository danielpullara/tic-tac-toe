import React, { Component } from 'react';
import './App.css';
import Board from './components/Board'
import FacebookLogin from 'react-facebook-login';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: ['', '', '', '', '', '', '', '', ''],
      nextPlayer: false,
      history: [],
      user: ''
    }
  }
  setParentState = (obj) => {
    this.setState(obj)
  }

  showPast = (item, index) => {
    console.log("whole history", this.state.history)
    this.setState({ squares: item.squares, nextPlater: item.nextPlayer, history: this.state.history.filter((i, e) => e <= index) })
  }

  responseFacebook = (response) => {
    console.log("result from facebook", response);
    this.setState({ user: response.name })
  }

  postData = async() => {
    console.log("here")
    let data = new URLSearchParams();
    data.append("player", this.state.user);
    data.append("score", "3");

    const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data.toString(),
      json: true
    });
    console.log("ddd", response)
  }
  getdata = async() =>{
    const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    let result = await fetch(url);
    let data = await result.json ();
    console.log("data from api", data)
  }

  render() {

    if (!this.state.user) {
      return (
        <FacebookLogin
          appId="200951591212303"
          autoLoad={true}
          fields="name,email,picture"
          callback={this.responseFacebook} />
      )
    }
    return (
      <div>

        <h1>Tic Tac Toe</h1>
        <h2> User Info : {this.state.user}</h2>
        <ul>
          {
            this.state.history.map((item, index) => {
              return (<li><button onClick={() => this.showPast(item, index)} >go to move {index + 1}</button></li>)
            })
          }
        </ul>
        <Board postData={this.postData} squares={this.state.squares} nextPlayer={this.state.nextPlayer} history={this.state.history} setParentState={this.setParentState} />
      </div >
    );

  }

}

export default App;


