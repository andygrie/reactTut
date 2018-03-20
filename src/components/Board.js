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
    return (
        <button className="square" onClick={props.onClick}>
        {props.value}
        </button>
    );
}
