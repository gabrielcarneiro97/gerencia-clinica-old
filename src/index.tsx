import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';

// import ptBR from 'antd/es/locale/pt_BR';
import moment from 'moment';
import './misc/antd.min.css';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import store from './store/store';
import { dbInit } from './db/db.service';

moment.locale('pt-br');

dbInit().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      {/* <ConfigProvider locale={ptBR}> */}
      <App />
      {/* </ConfigProvider> */}
    </Provider>,
    document.getElementById('root'),
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
