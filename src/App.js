import React, {Component} from 'react';
import moment from 'moment'; // What can I say, u need date/time stuff? then u need this
import './App.css'; // Do it with style!

// Import all the decomposed parts
import AddToDo from './AddTodo.js';
import ListToDoV2 from './ListToDoV2.js';
import AppHeader from './AppHeader.js';

// Setup a few vars for the API. Not the best way but works for this example
const todosListEndpoint = "http://localhost:3001/api/todos/";
const todoBasicEndpoint = "http://localhost:3001/api/todo/";
const todoUser = "testuser";

// Set the main app title
const appTitleOfTheDay = "Things I Will Likely Never Do...";

// Define the base application
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appTitle: appTitleOfTheDay, // My Application Title
            requestFailed: '',
            todos: [] // This will hold my list of ToDos
        };
    }

    // Lets load up our current list once component mounted
    componentDidMount() {
        this.fetchToDos();
    }

    // Grab those to dos
    fetchToDos() {
        console.log("Fetching To Do List: " + todosListEndpoint + todoUser);
        fetch(todosListEndpoint + todoUser)
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
                        if (!res.success) this.setState({requestFailed: res.error});
                    }
                );
            // Re-load our list/refresh
            this.fetchToDos();
            window.location.reload();
        }
    };

    // Process a Complete To Do Request
    clickComplete = (id) => {
        console.log('Clicked Update Status Item:', id);

        fetch(todoBasicEndpoint, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"id": id, "isDone": true})
        })
            .then(data => data.json())
            .then((res) => {
                if (!res.success) this.setState({requestFailed: res.error});
            });
        // Reload our todos
        window.location.reload();
    };

    // Process a Create New To Do Request
    clickAdd = (newTodo) => {
        if (!newTodo) {
            window.alert('No Entry was Made');
        }
        else {
            console.log('Clicked Add Item:' + newTodo);
            const updatedData =
                {
                    "username": todoUser,
                    "todo": newTodo,
                    "isDone": "false",
                    "dueDate": moment().format()
                };
            // const data = [...this.state.data, updatedData];
            // this.setState({data});

            fetch(todoBasicEndpoint, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedData),
            })
                .then(data => data.json())
                .then((res) => {
                    if (!res.success) this.setState({requestFailed: res.error});
                });
            // Reload our todos
            window.location.reload();
        }
    };

    // Render or Bender Bending Rodríguez
    render() {
        return (
            <div className="App">
                {/*Use or decomposed application header*/}
                <div className={"paddedDiv"}>
                <AppHeader appTitle={appTitleOfTheDay}/>
                </div>
                {/*Use our decomposed 'add new to do' section*/}
                <div className={"paddedDiv"}>
                    <AddToDo clicked={this.clickAdd}/>
                </div>
                {/*Use or decomposed to do grid display*/}
                <div className={"paddedDiv"}>
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
