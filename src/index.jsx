import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';

import './index.scss';

// Main component (will eventually use all the others)
class MoveXApplication extends React.Component {
    render() {
        return (
            <Container>
                <MainView />
            </Container>
        );
        /*
        <div className="move-x">
            <div>Good morning</div>
        </div> 
        */
    }
}

// Find the root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render the app in the root DOM element
ReactDOM.render(React.createElement(MoveXApplication), container);