import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import reducer from '../reducers';

export default function cofigureStore() {
  if (process.env.NODE_ENV === 'production') {
    return createStore(reducer, applyMiddleware(thunkMiddleware));
  }
  else {
    const composeDEV = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    const composeEnhancers = composeDEV ? composeDEV({ serialize: true }) : compose

    const store = createStore(
      reducer,
      composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware))
    );

    if (module.hot) {
      module.hot.accept('../reducers', () => { store.replaceReducer(reducer) });
    }

    return store;
  }
}
