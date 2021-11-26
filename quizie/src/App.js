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
      quiz: GenerateQuiz()
    }
  }

  render() {
    return (
      <QuizItemComponent item={this.state.quiz.items[0]} />
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