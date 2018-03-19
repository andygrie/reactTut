import React from 'react';

export default class Board extends React.Component {

    renderSquare(i) {
        return (
        <Square 
            value={this.props.squares[i]} 
            onClick={() => this.props.onClick(i)}
        />
        );
    }

    render() {
        let rows = 3;
        let cols = 3;
        let boardContent = [];
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){

            }
        }

        return (
        <div>
            <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </div>
            <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </div>
            <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            </div>
        </div>
        );
    }
}


function Square(props){
    return (
        <button className="square" onClick={props.onClick}>
        {props.value}
        </button>
    );
}
  