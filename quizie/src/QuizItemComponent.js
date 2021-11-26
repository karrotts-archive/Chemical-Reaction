import React from "react";

export default class QuizItemComponent extends React.Component {
    renderOptions(options) {
        const listedOptions = []
        for(let i = 0; i < options.length; i++) {
            listedOptions.push(<li key={i}><input value={i} name="answers" type="radio" /> {options[i]}</li>)
        }
        return listedOptions;
    }

    render() {
        return (
            <div>
                <h1>{this.props.item.question}</h1>
                <form>
                    {this.renderOptions(this.props.item.answers)}
                </form>
                <button className="btn btn-primary" onClick={this.props.nextHandler}>Next Question</button>
            </div>
        );
    }
}