import React from 'react';
import Quiz from './models/quiz';
import QuizItem from './models/quizItem';
import QuizItemComponent from './QuizItemComponent';
import logo from './logo.svg';
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
        <button onClick={() =>
          this.setState({currentQuestion: currentQuestionNumber - 1})
        }
        >
        Previous
        </button>
      );
    }

    header.push(<p>Question #{currentQuestionNumber + 1} of {this.state.quiz.items.length}</p>)

    if (currentQuestionNumber < this.state.quiz.items.length - 1) {
      header.push(<button onClick={() => 
        this.setState({currentQuestion: currentQuestionNumber + 1})
        }
      >
      Next
      </button>
      )
    }
    return header;
  }

  render() {
    return (
      <div>
        {this.renderHeader(this.state.currentQuestion)}
        <QuizItemComponent item={this.state.quiz.items[this.state.currentQuestion]} />
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
  const quiz = new Quiz();
  quiz.items.push(q1, q2);
  console.log(quiz.items);
  return quiz;
}