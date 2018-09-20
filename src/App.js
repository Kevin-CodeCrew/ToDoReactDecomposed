import React, {Component} from 'react';
// import logo from './logo.svg';
import logo from './todopostit.png';
import './App.css';

import AddToDo from "./AddTodo";
import ListToDoV2 from './ListToDoV2.js';

// Setup a couple vars for the API. Not the best way but works for this example
const todoListEndpoint = "http://localhost:3001/api/todos/";
const todoBasicEndpoint = "http://localhost:3001/api/todo/";
const todoUser = "testuser";

// Define the base application
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appTitle: "To Do List Ninja", // My Application Title
            requestFailed: false,
            todos: [] // This will hold my list of ToDos
        };
    }

    // Lets load up our current list once component mounted
    componentDidMount() {
        this.fetchToDos();
    }

    // Grab those to dos
    fetchToDos() {
        console.log("Fetching To Do List: " + todoListEndpoint + todoUser);
        fetch(todoListEndpoint + todoUser)
            .then(response => {
                if (!response.ok) {
                    throw Error("Failed connection to the API")
                }
                return response
            })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    todos: response
                })
            }, () => {
                this.setState({
                    requestFailed: true
                })
            })
    }

    // Process a Delete To Do Request
    clickDelete = (id) => {
        console.log('Clicked Delete Item:', id);
        const choice = window.confirm('Delete Item?');
        console.log(choice);
        if (choice) {
            console.log('Removing To Do ' + JSON.stringify({"id": id}));
            // Delete the item
            fetch(todoBasicEndpoint,
                {
                    method: "DELETE",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({"id": id})
                })
                .then((res) => {
                    if (!res.success) this.setState.requestFailed = true;
                }
                );
            // Re-load our list/refresh
            this.fetchToDos();
            window.location.reload();
        }
    };

    // Process a Complete To do Request
    clickComplete = (id) => {
        console.log('Clicked Update Item:', id);
    };

    // Process a Create To Do Request
    clickAdd = (newTodo) => {
        if (!newTodo) {
            window.alert('No Entry was Made');
        }
        else {
            console.log('Clicked Add Item:' + newTodo);
        }
    };

    // Render or Bender Bending Rodríguez
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">{this.state.appTitle}</h1>
                </header>
                <div>
                    <AddToDo clicked={this.clickAdd}/>
                </div>
                <div>
                    {/*Lets use properties to handle requests from other components*/}
                    <ListToDoV2 todos={this.state.todos} clickedDelete={this.clickDelete}
                                clickedComplete={this.clickComplete}/>
                </div>
            </div>

        );
    }
}

// Export our goodness to the masses
export default App;
