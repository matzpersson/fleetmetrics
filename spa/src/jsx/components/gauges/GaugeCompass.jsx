import React from 'react';
import { render } from 'react-dom';
import Compass from 'react-Compass';
import 'react-compass/dist/react-compass.css';
 
class MyApp extends React.Component {
    // ...
    render() {
        return (
            <Compass direction={this.state.newDirection} />
        );
    }
}
 
render(<MyApp />, document.getElementById('app'));
