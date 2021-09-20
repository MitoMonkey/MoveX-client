export const SET_MOVES = 'SET_MOVES';
export const SET_FILTER = 'SET_FILTER';

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