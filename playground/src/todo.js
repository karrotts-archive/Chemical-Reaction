import React from "react";

export default class Todo extends React.Component {
    constructor() {
        super();
        this.state = {
            todoItems: [],
            todoIndex: 0,
            itemText: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
    }

    handleChange = (event) => this.setState({itemText: event.target.value});
    handleSubmit = () => {
        const todoItem = {
            id: this.state.todoIndex,
            text: this.state.itemText
        }
        const items = this.state.todoItems;
        items.push(todoItem);

        this.setState({
            todoItems: items,
            todoIndex: this.state.todoIndex + 1,
            itemText: ""
        });
    }

    removeTodo(id) {
        const todoCopy = [...this.state.todoItems];
        for (let i = 0; i < this.state.todoItems.length; i++) {
            if (this.state.todoItems[i].id === id) {
                todoCopy.splice(i, 1);
                this.setState({todoItems: todoCopy});
                break;
            }
        }
    }

    render() { 
        return (
            <div>
                <input 
                    type="text"
                    value={this.state.itemText} 
                    onChange={this.handleChange} 
                />
                <button onClick={this.handleSubmit}>Submit</button>
                <DisplayTodos todoItems={this.state.todoItems} deleteHandler={(id) => this.removeTodo(id)} />
            </div>
        )
    }
}

class DisplayTodos extends React.Component {
    renderItems(items) {
        let rendered = [];
        for (let i = 0; i < items.length; i++) {
            rendered.push(
                <div key={i}>
                    <button onClick={() => this.props.deleteHandler(items[i].id)}>X</button>
                    <span>{items[i].text}</span>
                </div>
            );
        }
        return rendered;
    }
    render() {
        return (
            <div>
                {this.renderItems(this.props.todoItems)}
            </div>
        )
    }
}