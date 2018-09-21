import React, {Component} from 'react';
import logo from './todopostit.png';

// Our newly decomposed App Header!
class AppHeader extends Component {

    // Render or Bender Bending Rodríguez
    render() {
        return (

            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">{this.props.appTitle}</h1>
            </header>

        )
    }
}


// Export our goodness to the masses
export default AppHeader;