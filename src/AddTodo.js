import React, {Component} from 'react';

// Simple support for adding a To Do
class AddToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoText: ''
        };
        this.onChange = this.onChange.bind(this); // We need this bind to keep up with 'this'
    }

    // Update the To Do description as we type it
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    // Render or Bender Bending Rodríguez
    render() {
        return (
            <div>
                <div>
                    <br/>
                    <input
                        type="text"
                        name="title"
                        placeholder ="Enter a To Do..."
                        onChange={this.onChange}
                        value={this.state.todoText}
                    />
                </div>
                {/*Pass the enter To Do item to Parent callback*/}
                <button onClick={() => this.props.clicked(this.state.todoText)}>Add</button>
                <hr/>
            </div>
        );
    }
}

// Export our goodness to the masses
export default AddToDo;
