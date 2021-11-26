import React from "react";

export default class QuizItemComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    renderOptions(options) {
        const listedOptions = []
        for(let i = 0; i < options.length; i++) {
            listedOptions.push(<button key={i}>{options[i]}</button>)
        }
        return listedOptions;
    }

    render() {
        return (
            <div>
                <h1>{this.props.item.question}</h1>
                <ul>
                    {this.renderOptions(this.props.item.answers)}
                </ul>
            </div>
        );
    }
}