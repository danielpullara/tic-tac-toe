import React, { Component } from 'react';
import Square from './Square';

export default class Board extends Component {


    onSquareClicked = (i) => {    
        let squareList = this.props.squares.slice();
        if (squareList[i] === "") {
        if (this.props.nextPlayer) squareList[i] = "X";
        else squareList[i] = "0" 
        let obj = { squares:squareList,nextPlayer: !this.props.nextPlayer};
        this.props.setParentState(obj);          
        }
    }
    
    render() {  
        let status= ``;
        status = this.props.nextPlayer ? `nextPlayer is O` : `nextPlayer is X`
        return (
            <div>
                <h2>{status}</h2>
                <div style={{ display: "flex" }}>
                    <Square value={this.props.squares[0]} onClick={() => this.onSquareClicked(0)} />
                    <Square value={this.props.squares[1]} onClick={() => this.onSquareClicked(1)} />
                    <Square value={this.props.squares[2]} onClick={() => this.onSquareClicked(2)} />
                </div>
                <div style={{ display: "flex" }}>
                    <Square value={this.props.squares[3]} onClick={() => this.onSquareClicked(3)} />
                    <Square value={this.props.squares[4]} onClick={() => this.onSquareClicked(4)} />
                    <Square value={this.props.squares[5]} onClick={() => this.onSquareClicked(5)} />
                </div>
                <div style={{ display: "flex" }}>
                    <Square value={this.props.squares[6]} onClick={() => this.onSquareClicked(6)} />
                    <Square value={this.props.squares[7]} onClick={() => this.onSquareClicked(7)} />
                    <Square value={this.props.squares[8]} onClick={() => this.onSquareClicked(8)} />
                </div>
            </div>
        )
    }

} 