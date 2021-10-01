import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux'; // to make the store available to the components
import movesApp from './reducers/reducers'; // combined reducer
import { devToolsEnhancer } from 'redux-devtools-extension';

import './index.scss';

let preloadedState;
const storedUser = JSON.parse(localStorage.getItem('user'));
if (storedUser) {
    preloadedState = {
        user: storedUser
    }
}
const store = createStore(movesApp, preloadedState, devToolsEnhancer());

class MoveXApplication extends React.Component {
    render() {
        return (
            <Provider store={store}> {/* all components that need to access the state, need to be wrapped in the provider */}
                <Container fluid>
                    <MainView />
                </Container>
            </Provider>
        );
    }
}

// Find the root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render the app in the root DOM element
ReactDOM.render(React.createElement(MoveXApplication), container);