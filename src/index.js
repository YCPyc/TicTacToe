import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//children class
// class Square extends React.Component {
//     // constructor(props){
//     //     super(props);
//     //     this.state = {
//     //         value:null,
//     //     };          
//     // }

//     render() {
//       return (
//         <button 
//         className="square" 
//         //this.props.onClick() indicates the onClick method that is specifies int the parent class
//         onClick={() => this.props.onClick()}>
//           {this.props.value}
//         </button>
//       );
//     }
//   }

//we are going to change the class components into the function component
function Square(props){
    return (
        <button 
            className="square" 
            //this.props.onClick() indicates the onClick method that is specifies int the parent class
            //not brackets anymore in the function component
            onClick={props.onClick}>
                {props.value}
            </button>

    )
}


  //parent class
  class Board extends React.Component {
      
    renderSquare(i) {
        //pass down the state for each block to the children class
      return <Square 
            value = {this.props.squares[i]}
            //i corresponds to the a specific box
            onClick = {()=>this.props.onClick(i)}
             />;
    }
  
    render() {
    
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
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state={
          //initiate an array to document the states of each of the 9 blocks
          history: [{squares: Array(9).fill(null),}],
          isXNext: true,
          stepNumber: 0,
      }
    }

    handleClick(i){
      //copy of the array
      const history = this.state.history.slice(0,this.state.stepNumber+1);
      const current = history[history.length-1]
      const squares = current.squares.slice();
      //to halt the click event if there is already a winner
      if(squares[i] || calculateWinner(squares)){
          return;
      }

      squares[i] = this.state.isXNext ? 'X' : 'O';
      this.setState({
          history: history.concat([{squares:squares,}]),
          stepNumber: history.length,
          //use semi colon instead of equal sign
          isXNext: !this.state.isXNext,});
      }

      jumpTo(step){
        this.setState({
          stepNumber: step,
          isXNext: (step % 2) === 0,
        })
      }



    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      const moves = history.map((step,move)=>{
      const desc = move ? 'Go to move #' + move : 'Go to Game Start';
        return (
          <li>
            <button onClick={()=> this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
      let status
      if(winner){
          status = 'Winner is ' + winner
      } 
      else{
        status = 'Next player: ' + (this.state.isXNext ? 'X':'O')}
    
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares = {current.squares}
              onClick = {(i) => this.handleClick(i)}
            
            />
          </div>
          <div className="game-info">
            <div>{status }</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares){
    const lines = [
        //horizontal lined up
        [0,1,2],
        [3,4,5],
        [6,7,8],
        //vertical lined up
        [0,3,6],
        [1,4,7],
        [2,5,8],
        //diagonal lined up
        [0,4,8],
        [2,4,6],
    ];
    //in for loop remember to use let not const, const is read only
    for(let i =0; i<lines.length; i++){
        const [a,b,c] = lines[i];
        //make sure the square is not null first
        if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  