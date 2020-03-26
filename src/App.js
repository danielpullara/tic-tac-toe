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
      user: '',
      topRank: [],
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

  postData = async(duration) => {
    console.log("here")
    let data = new URLSearchParams();
    data.append("player", this.state.user);
    data.append("score", duration);

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
    this.getdata();
    
  }
  getdata = async() =>{
    const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    let result = await fetch(url);
    let data = await result.json ();
    this.setState({topRank: data.items})
  }

  render() {

    if (!this.state.user) {
      return (
        <FacebookLogin
          appId="200951591212303"
          autoLoad={false}
          fields="name,email,picture"
          callback={resp => this.responseFacebook(resp)} />
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
        <ol>Top Score {this.state.topRank.map((item)=>{
            return (<li>{item.player}:{item.score}</li>)
        })
        }
         </ol>
      </div >
    );

  }

}

export default App;


