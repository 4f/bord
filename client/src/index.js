import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

import store from './store'

registerServiceWorker();

const render = () => ReactDOM.render(<Component />, document.getElementById('root'))

const Component = () => (
  <Provider store={store()}>
    <App />
  </Provider>
)

render()

if (module.hot) module.hot.accept(Component, () => render());

registerServiceWorker()
