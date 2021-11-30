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
        this.updateTodo = this.updateTodo.bind(this);
        this.setTodoEdit = this.setTodoEdit.bind(this);
    }

    handleChange = (event) => this.setState({itemText: event.target.value});
    handleSubmit = () => {
        const todoItem = {
            id: this.state.todoIndex,
            text: this.state.itemText,
            edit: false
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

    updateTodo(id, message) {
        const todoCopy = [this.state.todoItems];
        for (let i = 0; i < this.state.todoItems.length; i++) {
            if (this.state.todoItems[i].id === id) {
                todoCopy[i].text = message;
                todoCopy[i].edit = false;
                this.setState({todoItems: todoCopy});
                break;
            }
        }
    }
    
    setTodoEdit(id) {
        const todoCopy = [...this.state.todoItems];
        for (let i = 0; i < this.state.todoItems.length; i++) {
            if (this.state.todoItems[i].id === id) {
                todoCopy[i].edit = true;
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
                <DisplayTodos 
                    todoItems={this.state.todoItems} 
                    deleteHandler={(id) => this.removeTodo(id)}
                    updateHandler={(id, message) => this.updateTodo(id, message)} 
                    editHandler={(id) => this.setTodoEdit(id)}
                />
            </div>
        )
    }
}

class DisplayTodos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editItems: props.todoItems
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (id, event) => {
        for (let i = 0; i < this.state.editItems.length; i++) {
            if (this.state.editItems[i].id === id) {
                let copy = this.state.editItems;
                copy[i].message = event.target.value;
                this.setState({editItems: copy});
                break;
            }
        }
    };

    getEditItem(id) {
        for (let i = 0; i < this.state.editItems.length; i++) {
            if (this.state.editItems[i].id === id) {
                return this.state.editItems[i];
            }
        }
    }



    renderItems(items) {
        let rendered = [];
        for (let i = 0; i < items.length; i++) {
            rendered.push(
                items[i].edit ? (
                <div key={i}>
                    <input 
                        type="text"
                        value={this.getEditItem(items[i].id).text} 
                        onChange={(e) => this.handleChange(items[i].id, e)} 
                    />
                    <button onClick={() => this.props.updateHandler(items[i].id, this.getEditItem(items[i].id).text)}>Save</button>
                </div>
                ) : (
                <div key={i}>
                    <button onClick={() => this.props.deleteHandler(items[i].id)}>X</button>
                    <button onClick={() => this.props.editHandler(items[i].id, "Edited")}>EDIT</button>
                    <span>{items[i].text}</span>
                </div>
                )
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