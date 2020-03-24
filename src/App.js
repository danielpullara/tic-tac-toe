import React, { Component } from 'react';
import './App.css';
import Board from './components/Board'



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: ['', '', '', '', '', '', '', '', ''],
      nextPlayer: false
    }
  }
  setParentState = (obj) => {
    this.setState(obj)
  }
  render() {
    
    if (this.props)
      return (
        <div>
          <h1>Tic Tac Toe</h1>
          <Board squares={this.state.squares} nextPlayer={this.state.nextPlayer} setParentState={this.setParentState} />
        </div >
      );

  }

}

export default App;
