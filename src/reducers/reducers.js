import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVES, SET_USER, ADD_FAV, REM_FAV } from '../actions/actions';

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

function user(state = '', action) {
    switch (action.type) {
        case SET_USER:
            return action.username;
        default:
            return state;
    }
}
function favs(state = '', action) { // the local "state" is the global state.favs, due to the combined reducer
    switch (action.type) {
        case ADD_FAV:
            if (state.includes(action.id)) {
                return state;
            }
            // if it is the first/only move in the favs
            if (state.length === 0) {
                return state.concat(action.id);
            }
            else {
                return state.concat(',' + action.id);
            }
        case REM_FAV:
            // if there is only this one move in the list
            if (!state.includes(',')) {
                return state.replace(action.id, '');
            }
            // if there are multiple entries and moveID is the first in the list
            if (state.indexOf(action.id) === 0 && state.includes(',')) {
                return state.replace(action.id + ',', '');
            }
            // if it is the last move in the list OR anywhere in the middle
            if (state.indexOf(action.id) > 0) {
                return state.replace(',' + action.id, '');
            }
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
}  */
// short version using combineReducers function
const movesApp = combineReducers({
    visibilityFilter,
    moves,
    user,
    favs
});

export default movesApp;