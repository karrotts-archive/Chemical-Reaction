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

    renderRow(rowNum) {
        let rows = [];
        for (let i = rowNum * 3; i < (rowNum * 3) + 3; i++) {
            rows.push(this.renderSquare(i));
        }
        return rows;
    }

    render() {
        return (
        <div>
            <div className="board-row">
            {this.renderRow(0)}
            </div>
            <div className="board-row">
            {this.renderRow(1)}
            </div>
            <div className="board-row">
            {this.renderRow(2)}
            </div>
        </div>
        );
    }
}