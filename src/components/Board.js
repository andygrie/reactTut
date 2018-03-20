import React from 'react';

export default class Board extends React.Component {

    renderSquare(i) {
        return (
        <Square
            value={this.props.squares[i].value}
            isWinningSquare={isSquareInWinningSquares({index: i, squares: this.props.squares})}
            onClick={() => this.props.onClick(i)}
        />
        );
    }

    render() {
        const boardArray = createArray(3,3);

        const rows = boardArray.map((cols, index) => {
            const row = cols.map((col) => {
                return (
                    <span key={col}>{this.renderSquare(col)}</span>
                );
            });
            const boardRow = (
                <div className="board-row" key={index}>
                    {row}
                </div>
            );
            return boardRow;
        });
        return (
            <div>
                {rows}
            </div>
        );
    }
}


function createArray(width, height){
    let rows = [];
    for(let i = 0; i < height; i++){
        let cols = [];
        for(let j = 0; j < width; j++){
            cols.push(j + 3 * i);
        }
        rows.push(cols);
    }
    return rows;
}

function Square(props){
    let className = 'square';
    if(props.isWinningSquare)
        className += ' winning-square';
    return (
        <button className={className} onClick={props.onClick}>
        {props.value}
        </button>
    );
}
function isSquareInWinningSquares(squares){
    let winningSquares = getWinningSquares(squares.squares);
    let isInWinningSquares;
    if(winningSquares == null)
        isInWinningSquares = false;
    else if(squares.index === winningSquares[0] || squares.index === winningSquares[1] || squares.index === winningSquares[2])
        isInWinningSquares = true;
    else
        isInWinningSquares = false;

    return isInWinningSquares;
}

function getWinningSquares(squares){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    let winningSquares = null;
    for(let i = 0; i < lines.length && winningSquares == null; i++){
      const [a, b, c] = lines[i];
      if(squares[a].value && squares[a].value === squares[b].value && squares[a].value === squares[c].value){
        winningSquares = lines[i];
      }
    }
    return winningSquares;
}