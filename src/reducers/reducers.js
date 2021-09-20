import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVES } from '../actions/actions';

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

function moves(state = [], action) {
    switch (action.type) {
        case SET_MOVES:
            return action.value;
        default:
            return state;
    }
}

// combined reducer: call the reducers defined above and pass them the state they are concered with
/* long version
function movesApp(state = {}, action) {
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        moves: moves(state.moves, action)
    }
} 
short version using combineReducers function */
const movesApp = combineReducers({
    visibilityFilter,
    moves
});

export default movesApp;