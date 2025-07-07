import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

class NoteList extends React.Component {

    render() {
        const { notes, selectNote, selectedNote } = this.props;/*свойства которые прописаны у компонента или в контейнере, например <NoteList selectedNote={0}>*/
        return (
            <ListGroup>
                {notes.map(
                    (value, key) => (<ListGroupItem key={key} header={`№ ${key + 1}`}
                        bsSize={key === selectedNote ? 'info' : 'default'}
                        onClick={() => selectNote(key)}>
                        {value}
                    </ListGroupItem>)
                )}
            </ListGroup>
        );
    }
}

export default NoteList;
