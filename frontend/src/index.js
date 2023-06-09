import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch, { restoreCSRF } from './store/csrf';
import * as sessionActions from './store/session';
import * as businessActions from './store/businessPages'

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.businessActions = businessActions;
}
const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

if (sessionStorage.getItem('X-CSRF-Token') === null) {
  store.dispatch(sessionActions.showCurrentUser()).then(renderApp);
} else {
  renderApp();
}
