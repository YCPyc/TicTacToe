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
      constructor(props){
          super(props);
          this.state={
              //initiate an array to document the states of each of the 9 blocks
              squares: Array(9).fill(null),
              isXNext: true
          }
      }
      
    renderSquare(i) {
        //pass down the state for each block to the children class
      return <Square 
            value = {this.state.squares[i]}
            onClick = {()=>this.handleClick(i)}
             />;
    }

    
    handleClick(i){
        //copy of the array
        const squares = this.state.squares.slice();

        squares[i] = this.state.isXNext ? 'X' : 'O';
        this.setState({squares:squares})
        this.state.isXNext = !this.state.isXNext
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
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
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  