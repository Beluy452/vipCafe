import React from 'react';
import App from './modules/App';
import ReactDOM from 'react-dom';
import './assets/styles/index.scss';
import { Provider } from 'react-redux';
import { configureStore, history } from './core';
import { RouterService } from './shared/services';

import {checkAuth} from './core/actions/check-auth';

export const store = configureStore();

RouterService.setStore(store);
// const check = async () => {
//   return new Promise(res => {
//     setTimeout(() => {
//       store.dispatch(loginSuccess());
//       res(true);
//     }, 1000)
//   })
// };
checkAuth(store.dispatch).then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App history={history}/>
    </Provider>,
    document.getElementById('root'));
});
