import React from 'react';
import * as rb from 'react-bootstrap'
import { Dialog, Toolbar } from './Common' // импортируем сами компоненты т.к. проброс не делали и всё будем передавать сами
import DateList from '../containers/DateList'; // импортируем компоненты из контейнеров иначе проброс данных(props) из хранилища(store) или действия(actions) работать не будет
import NoteList from '../containers/NoteList'; // импортируем компоненты из контейнеров иначе проброс данных(props) из хранилища(store) или действия(actions) работать не будет

class App extends React.Component {

    constructor(props) {
        super(props);
        this.showDateDialog = null;
        this.showNoteDialog = null;
        this.state = {
            isDateEdit: false,
            isNoteEdit: false
        }
    }

    componentDidMount() {// вызывается после первой отрисовки(render) компонента
        const { fetchDates } = this.props;
        fetchDates();
    }

    saveDates() {
        const { dates } = this.props;
        localStorage.setItem('dates', JSON.stringify(dates.toJS()));
    }

    render() {
        const { addDate, setDate, deleteDate, addNote, setNote, selectedDate, selectedNote, deleteNote, countNotes } = this.props; /*свойства которые прописаны у компонента или в контейнере*/
        const { isDateEdit, isNoteEdit } = this.state;

        return (
            <rb.Well>
                <rb.Grid>
                    <rb.Row>
                        <rb.Col md={4}>
                            <h4>Календарь</h4>
                            <Dialog title={`${isDateEdit ? 'Изменить' : 'Добавить'} дату`}
                                btnTitle={`${isDateEdit ? 'Изменить' : 'Добавить'}`}
                                handler={show => this.showDateDialog = show}
                                apply={date => isDateEdit ? setDate(date) : addDate(date)}
                                type={'date'} />
                            <Toolbar setParentState={(props, callback) => this.setState(props, callback)}
                                openDialog={() => this.showDateDialog()}
                                propName={'isDateEdit'}
                                selected={selectedDate}
                                deleteItem={() => deleteDate()}>
                                <rb.Button onClick={() => this.saveDates()} 
                                    title="Сохранить изменения">
                                    <rb.Glyphicon glyph='floppy-disk' /></rb.Button>
                            </Toolbar>
                            <DateList />
                        </rb.Col>
                        <rb.Col md={8}>
                            <h4>Заметки</h4>
                            <Dialog title={`${isNoteEdit ? 'Изменить' : 'Добавить'} заметку`}
                                btnTitle={`${isNoteEdit ? 'Изменить' : 'Добавить'}`}
                                handler={show => this.showNoteDialog = show}
                                apply={note => isNoteEdit ? setNote(note) : addNote(note)} />
                            <Toolbar setParentState={(props, callback) => this.setState(props, callback)}
                                openDialog={() => this.showNoteDialog()}
                                propName={'isNoteEdit'}
                                disableAdd={!!!selectedDate || countNotes > 4}
                                selected={selectedNote}
                                deleteItem={() => deleteNote()} />
                            <NoteList />
                        </rb.Col>
                    </rb.Row>
                </rb.Grid>
            </rb.Well>
        );
    }
}

export default App;
