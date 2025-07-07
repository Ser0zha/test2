import React from 'react'
import mt from 'moment';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'

class DateList extends React.Component {

    render() {
        const { dates, selectDate, selectedDate } = this.props; /*свойства которые прописаны у компонента или в контейнере, например <DateList selectedDate={'2022-03-20'}>*/
        return (
            <ListGroup>
                {dates.keySeq().map(
                    key => {
                        const date = mt(key);
                        const today = mt();
                        return (<ListGroupItem key={key} onClick={() => selectDate(key)} bsSize={key === selectedDate ? 'info': 'default'}>
                            <Row>
                                <Col md={12}>
                                    <b>{date.format('DD.MM.yyyy')/*выводим дату в виде 03.08.2020*/}</b>{date.format(' dddd')/* день недели */}
                                </Col>
                            </Row>
                            <Row>
                                <Col mdOffset={1} md={11}>
                                    {today.to(date)/* сколько времени до даты */}
                                </Col>
                            </Row>
                            <Row>
                                <Col mdOffset={1} md={11}>
                                    Заметок {dates.get(key).size}/5{/* сколько заметок создано из 5 */}
                                </Col>
                            </Row>
                        </ListGroupItem>)
                    }
                ).toArray()}
            </ListGroup>
        );
    }
}

export default DateList;

