import im from 'immutable';

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

const initialState = im.fromJS(
    {
        dates: {},
        selectedDate: null,
        selectedNote: null
    }
);

const reducer = (state = initialState, action) => {
    const data = action.payload;
    switch (action.type) {
        case FETCH_DATES:
            return state.set('dates', im.fromJS(data));
        case ADD_DATE:
            return state.setIn(['dates', data], im.List());
        case SET_DATE:
            const oldDate = ['dates', data.oldDate];
            const newDate = ['dates', data.newDate];
            return state.setIn(newDate, state.getIn(oldDate)).deleteIn(oldDate).set('selectedDate', null);
        case DELETE_DATE:
            return state.deleteIn(['dates', data]).set('selectedDate', null);
        case SELECT_DATE:
            return state.set('selectedDate', data);
        case ADD_NOTE:
            const index = state.getIn(['dates', data.date]).size;
            return state.setIn(['dates', data.date, index], data.note);
        case SET_NOTE:
            return state.setIn(['dates', data.date, data.index], data.note);
        case SELECT_NOTE:
            return state.set('selectedNote', data);
        case DELETE_NOTE:
            return state.deleteIn(['dates', data.date, data.index]).set('selectedNote', null);
        default:
            return state;
    }
}

export default reducer;
