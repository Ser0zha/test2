import { connect } from 'react-redux'
import im from 'immutable';
import App from '../components/App'
import { addDate, setDate, deleteDate, addNote, setNote, deleteNote, fetchDates } from '../actions'

const mapStateToProps = store => {/*прокидываем свойства из хранилища в компонент*/
    return {
        dates: store.get('dates'),
        selectedDate: store.get('selectedDate'),
        selectedNote: store.get('selectedNote'),
        countNotes: store.getIn(['dates', store.get('selectedDate')], im.List()).size
    }
};

const mapDispatchToProps = dispatch => {/*прокидываем действия(actions) в компонент*/
    return {
        fetchDates: () => dispatch(fetchDates()),
        addDate: date => dispatch(addDate(date)),
        setDate: newDate => dispatch(setDate(newDate)),
        deleteDate: () => dispatch(deleteDate()),
        addNote: note => dispatch(addNote(note)),
        setNote: note => dispatch(setNote(note)),
        deleteNote: () => dispatch(deleteNote())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
