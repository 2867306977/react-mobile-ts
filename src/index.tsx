import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { Icon } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.less';
import './styles/reset.less';
import './styles/common.less';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Icon type="loading" />}>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
