import ActionCable from 'actioncable';

import types  from '../constants/sockets';
import config from '../constants/config';

const missingSocketConnection = () => (
  { type: types.CONNECT_MISSING, payload: new Error('Missing connection!') }
);

let socket = null;

const connect = () => (dispatch, getState) => {
  const { services: { serverStatus } } = getState();

  if (serverStatus[types.CONNECT_REQUEST])
    return;

  dispatch({ type: types.CONNECT_REQUEST });
  socket = ActionCable.createConsumer(config.socketUrl);

  if (!socket)
    return dispatch(missingSocketConnection());

  socket.subscriptions.create('MessagesChannel',
    { 
      connected: () => dispatch({ type: types.CONNECT_SUCCESS }),
      received: (data) => dispatch({ type: types[data.name], pl: data })
    }
  );
  return Promise.resolve();
};



const register = (type, emit) => (payload) => (dispatch, getState) => {
  if (!socket) dispatch(missingSocketConnection());
  socket.emit(emit, payload);
  dispatch({ type: types[type], payload });
}

export default {
  connect
};
