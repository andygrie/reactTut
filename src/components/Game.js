import React from 'react';
import Board from './Board';

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history : [{
        squares: Array(9).fill().map(square => ({winner: false, value: null})),
        position: {
          col : -1,
          row : -1,
        }
      }],
      stepNumber: 0,
      xIsNext: true,
      ascOrder: true
    }
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(!calculateWinner(squares) && !squares[i].value){
      squares[i] = this.state.xIsNext ? {winner: false,value: 'X'} : {winner: false,value: 'O'};
      let position = {
        col : 0,
        row : -1
      };
      position.col = i % 3;
      position.row = Math.round((i - 1) / 3);
      this.setState({
        history: history.concat([{
          squares : squares,
          position : position
        }]),
        stepNumber: history.length,
        xIsNext : !this.state.xIsNext
      });
    }
  }
  sortMoveButtons(){
    this.setState({
      ascOrder: !this.state.ascOrder
    })
  }
  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move + '(' + history[move].position.col + ',' + history[move].position.row + ')':
        'Go to game start';


      let liComponent = (
        <li key={move}>
          <button class="nav-button" onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );

      if(move === this.state.stepNumber){
        liComponent = (
          <li key={move}>
            <button class="nav-button" onClick={() => this.jumpTo(move)}><b>{desc}</b></button>
          </li>
        );
      }
      return liComponent;
    });
    if(!this.state.ascOrder)
      moves = moves.reverse();

    let status;
    if(winner)
      status = 'Winner: ' + winner;
    else if(isDraw(current.squares))
      status = 'It\'s a draw';
    else
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          <div>
            <button className="sort-moves" onClick={() => this.sortMoveButtons()}>Sort</button>
          </div>
        </div>
      </div>
    );
  }
}
function calculateWinner(squares){
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
  let winner = null;
  for(let i = 0; i < lines.length && winner == null; i++){
    const [a, b, c] = lines[i];
    if(squares[a].value && squares[a].value === squares[b].value && squares[a].value === squares[c].value){
      winner = squares[a].value;
    }
  }
  return winner;
}

function isDraw(squares){
  let isDraw = false;
  if(squares.filter(square => square.value === null).length === 0)
    isDraw = true;
  return isDraw;
}