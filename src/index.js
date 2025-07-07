import React from 'react'
import ReactDOM from 'react-dom' 
import { Provider } from 'react-redux' // прослойка между react и redux
import { applyMiddleware, createStore } from 'redux' // для централизованного хранилища
import thunk from 'redux-thunk' // для асинхронных операций
import mt from 'moment' // библиотека для работы с временем
import App from './containers/App'
import reducer from './reducer'
import 'bootstrap/dist/css/bootstrap.min.css'; // подключаем стили bootstrap
import 'bootstrap/dist/css/bootstrap-theme.min.css'; // подключаем тему bootstrap

mt.locale('ru'); // сообщаем библиотеке что использовать нужно русскую локализацию

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') { // если собрали в development mode то добавляем логгер для redux(на каждое изменение хранилища)
    const { logger } = require('redux-logger');
    middleware.push(logger);
}

const store = createStore(reducer, applyMiddleware(...middleware)); // создаем хранилище

const root = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    root
);
