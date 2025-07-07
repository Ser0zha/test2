import { connect } from 'react-redux'
import { selectDate } from '../actions';
import DateList from '../components/DateList'

const mapStateToProps = store => {/*прокидываем свойства из хранилища в компонент*/
    return {
        dates: store.get('dates'),
        selectedDate: store.get('selectedDate')
    }
};

const mapDispatchToProps = dispatch => {/*прокидываем действия(actions) в компонент*/
    return {
        selectDate: date => dispatch(selectDate(date))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DateList)
