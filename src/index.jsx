import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';

import './index.scss';

class MoveXApplication extends React.Component {
    render() {
        return (
            <Container fluid>
                <MainView />
            </Container>
        );
    }
}

// Find the root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render the app in the root DOM element
ReactDOM.render(React.createElement(MoveXApplication), container);