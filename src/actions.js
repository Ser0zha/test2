import {
    FETCH_DATES,
    ADD_DATE,
    SET_DATE,
    DELETE_DATE,
    SELECT_DATE,
    ADD_NOTE,
    SET_NOTE,
    SELECT_NOTE,
    DELETE_NOTE
} from './const';

export function fetchDates() {
    return dispatch => {
        Promise.resolve(localStorage.getItem('dates'))
            .then(data => data != null && dispatch({
                type: FETCH_DATES,
                payload: JSON.parse(data)
            }));
    }
}

export function addDate(date) {
    return dispatch => dispatch({
        type: ADD_DATE,
        payload: date
    });
}

export function setDate(newDate) {
    return (dispatch, getState) => dispatch({
        type: SET_DATE,
        payload: { oldDate: getState().get('selectedDate'), newDate }
    });
}

export function deleteDate() {
    return (dispatch, getState) => dispatch({
        type: DELETE_DATE,
        payload: getState().get('selectedDate')
    });
}

export function selectDate(date) {
    return dispatch => dispatch({
        type: SELECT_DATE,
        payload: date
    });
}

export function selectNote(index) {
    return dispatch => dispatch({
        type: SELECT_NOTE,
        payload: index
    });
}

export function addNote(note) {
    return (dispatch, getState) => dispatch({
        type: ADD_NOTE,
        payload: {
            date: getState().get('selectedDate'),
            note
        }
    });
}

export function setNote(note) {
    return (dispatch, getState) => dispatch({
        type: SET_NOTE,
        payload: {
            date: getState().get('selectedDate'),
            index: getState().get('selectedNote'),
            note
        }
    });
}

export function deleteNote() {
    return (dispatch, getState) => dispatch({
        type: DELETE_NOTE,
        payload: {
            date: getState().get('selectedDate'),
            index: getState().get('selectedNote')
        }
    });
}
