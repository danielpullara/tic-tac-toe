import React, { Component } from 'react';
import Square from './Square';


let startTime =0;
let gameOver = false;
export default class Board extends Component {

    onSquareClicked = (i) => {

        if(startTime === 0){ 
            startTime = Date.now();    
        }  

        let squareList = this.props.squares.slice();

        // squareList[i] = this.props.nextPlayer ? "0" : "X"
        if (squareList[i] === "") {
            if (this.props.nextPlayer) squareList[i] = "X";
            else squareList[i] = "0"

            this.props.setParentState({ squares: squareList, nextPlayer: !this.props.nextPlayer, history: [...this.props.history, { squares: squareList, nextPlayer: !this.props.nextPlayer }] })

        }
    }
    checkGameIsOver(squares) {
        const winCase = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < winCase.length; i++) {
            let [a, b, c] = winCase[i];
            if (this.props.squares[a] === this.props.squares[b] && this.props.squares[a] === this.props.squares[c]) {
                return this.props.squares[a];
            }

        }
        return null;
    }

    render() {
        let status = ``;
        if(gameOver){
            status = `game over`
        }else {
        let winner = this.checkGameIsOver();
        if (winner) {
            let duration = Date.now() - startTime;
            this.props.postData(duration);
            status = `winner is ${winner}`
            gameOver = true;
        } else {
            status = this.props.nextPlayer ? `nextPlayer is O` : `nextPlayer is X`
        }
        }
        


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