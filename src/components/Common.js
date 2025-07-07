import React from 'react';
import * as rb from 'react-bootstrap'

export class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDialog: false,
            value: ''
        } // начальные свойства после создания компонента
    }

    componentDidMount() { // вызывается после первой отрисовки(render) компонента
        const { handler } = this.props;
        if (handler) {
            handler(() => this.showDialog()); // передаем возможность показывать диалог
        }
    }

    showDialog() {
        this.setState({ showDialog: true }) // показываем диалог
    }

    hideDialog() {
        this.setState({ showDialog: false, value: '' }) // скрываем диалог и очищаем поле ввода
    }

    onChangeValue(e) {
        this.setState({ value: e.target.value }) // запоминаем значение которое ввели в поле
    }

    render() {
        const { title, btnTitle, type = 'text', apply } = this.props; /*свойства которые прописаны у компонента или в контейнере, например <Dialog type={'date'}>*/
        const { showDialog, value } = this.state; /*свойства которые заданы в самом компоненте и доступны только ему*/

        return (<rb.Modal show={showDialog} onHide={() => this.hideDialog()}> {/*в зависимости от showDialog(true/false) диалог будет отображаться в окне*/}
            <rb.Modal.Header closeButton>
                <rb.Modal.Title>{title}</rb.Modal.Title>
            </rb.Modal.Header>
            <rb.Modal.Body>
                <rb.FormControl type={type} value={value} onChange={e => this.onChangeValue(e)} />{/*поле ввода по умолчанию текстовое*/}
            </rb.Modal.Body>
            <rb.Modal.Footer>
                <rb.Button onClick={() => this.hideDialog()}>Закрыть</rb.Button>
                <rb.Button disabled={!!!value} onClick={() => { apply(value); this.hideDialog(); }}>{btnTitle}</rb.Button>{/*кнопка добавления активна если поле ввода не пустое*/}
            </rb.Modal.Footer>
        </rb.Modal>);
    }
}

export class Toolbar extends React.Component {
    render() {
        const { setParentState, openDialog, propName, selected, disableAdd, deleteItem, children } = this.props; /*свойства которые прописаны у компонента или в контейнере, например <Toolbar disableAdd={true}>*/
        /*свойство children является стандартным и содержит в себе вложенные(дочерние) компоненты, например <Toolbar><h4>Я часть children!</h4></Toolbar>*/

        return (<rb.FormGroup>
            <rb.ButtonGroup>
                <rb.Button disabled={disableAdd} onClick={() => setParentState({ [propName]: false }, () => openDialog())}>{/*например propName это 'myProp', то { [propName]: false } будет преобразовано в { myProp: false }*/}
                    <rb.Glyphicon glyph='plus' style={{ color: 'YellowGreen' }} />
                </rb.Button>
                <rb.Button disabled={!!!selected && selected !== 0} onClick={() => setParentState({ [propName]: true }, () => openDialog())}>
                    <rb.Glyphicon glyph='pencil' style={{ color: 'Orange' }} />
                </rb.Button>
                <rb.Button disabled={!!!selected && selected !== 0} onClick={() => deleteItem()}>
                    <rb.Glyphicon glyph='remove' style={{ color: 'Red' }} />
                </rb.Button>
                {children}
            </rb.ButtonGroup>
        </rb.FormGroup>)
    }
}
