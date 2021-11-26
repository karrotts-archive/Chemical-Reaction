import React from 'react';
import Quiz from './models/quiz';
import QuizItem from './models/quizItem';
import QuizItemComponent from './QuizItemComponent';
import './App.css';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quiz: GenerateQuiz(),
			currentQuestion: 0,
		}
	}

	renderHeader(currentQuestionNumber) {
		let header = [];

		if (currentQuestionNumber > 0) {
			header.push(
				<div className="col-md-3 justify-content-center justify-content-md-between">
					<button 
						onClick={() =>
							this.setState({currentQuestion: currentQuestionNumber - 1})
						}
						className="btn btn-outline-primary"
					>
						Previous
					</button>
				</div>
			);
		} else {
			header.push(<div className="col-md-3 justify-content-center justify-content-md-between"></div>)
		}

		header.push(
			<div 
				className="col-md-3 justify-content-center justify-content-md-between"
				style={{textAlign: 'center'}}
			>
				Question #{currentQuestionNumber + 1} of {this.state.quiz.items.length}
			</div>
		);

		if (currentQuestionNumber < this.state.quiz.items.length - 1) {
			header.push(
				<div className="col-md-3 justify-content-center justify-content-md-between">
					<button 
						onClick={() => 
							this.setState({currentQuestion: currentQuestionNumber + 1})
						}
						className="btn btn-outline-primary"
						style={{float: 'right'}}
					>
					Next
					</button>
				</div>
			)
		} else {
			header.push(<div className="col-md-3 justify-content-center justify-content-md-between"></div>)
		}
		return header;
	}

	handleNextButton() {
		if (this.state.currentQuestion < this.state.quiz.items.length - 1) {
			this.setState({currentQuestion: this.state.currentQuestion + 1});
		}
	}

	optionChange(currentQuestion, value) {
		let quizCopy = this.state.quiz;
		quizCopy.items[currentQuestion].chosenAnswer = value;
		this.setState({quiz: quizCopy});
	}

	render() {
		return (
			<div className="container">
				<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
					{this.renderHeader(this.state.currentQuestion)}
				</div>
				<QuizItemComponent 
					item={this.state.quiz.items[this.state.currentQuestion]} 
					nextHandler={() => this.handleNextButton()}
					optionChangeHandler={(value) => this.optionChange(this.state.currentQuestion, value)}
				/>
			</div>
		)
	}
}

//temp function to generate a quiz
function GenerateQuiz() {
	const q1 = new QuizItem(
		"What is 2+2?",
		[
			"A math question",
			"Addition",
			"4",
			"All of the Above"
		],
		3
	)
	const q2 = new QuizItem(
		"What is the meaning of life?",
		[
			"Abstract math",
			"42",
			"The girl next door",
			"Pokemon Trading Cards"
		],
		1
	);
	const q3 = new QuizItem(
		"How many apples are in this tree?",
		[
			"What tree?",
			"5",
			"69",
			"Steve Jobs was right"
		],
		0
	);
	const quiz = new Quiz();
	quiz.items.push(q1, q2, q3);
	return quiz;
}