import { connect } from 'react-redux'
import im from 'immutable';
import NoteList from '../components/NoteList'
import { selectNote } from '../actions';

const mapStateToProps = store => {/*прокидываем свойства из хранилища в компонент*/
    return {
        notes: store.getIn(['dates', store.get('selectedDate')], im.List()),
        selectedNote: store.get('selectedNote')
    }
};

const mapDispatchToProps = dispatch => {/*прокидываем действия(actions) в компонент*/
    return {
        selectNote: index => dispatch(selectNote(index))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteList)
