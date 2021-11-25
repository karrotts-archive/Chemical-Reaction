import React from "react";
import Square from "./square";

export default class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square 
                value={this.props.squares[i]} 
                onClick={() => this.props.onClick(i)}
            /> 
        );
    }

    renderRows() {
        let rows = [];
        let index = 0;
        for (let i = 0; i < 3; i ++) {
            let squares = [];
            for (let j = 0; j < 3; j++) {
                squares.push(this.renderSquare(index));
                index++;
            }
            rows.push(<div className="board-row">{squares}</div>)
        }
        return rows;
    }

    render() {
        return (
        <div>
            {this.renderRows()}
        </div>
        );
    }
}