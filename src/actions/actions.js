export const SET_MOVES = 'SET_MOVES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const SET_FAVS = 'SET_FAVS';
export const ADD_FAV = 'ADD_FAV';
export const REM_FAV = 'REM_FAV';

export function setMoves(value) {
    return {
        type: SET_MOVES,
        value
    };
}

export function setFilter(value) {
    return {
        type: SET_FILTER,
        value
    };
}

export function setUser(username) {
    return {
        type: SET_USER,
        username
    };
}

export function setFavs(value) {
    return {
        type: SET_FAVS,
        value
    };
}
export function addFav(id) {
    return {
        type: ADD_FAV,
        id
    };
}
export function remFav(id) {
    return {
        type: REM_FAV,
        id
    };
}