import { combineReducers } from 'redux';
import sockets from '../constants/sockets';

const Message = {
  _message: ({ pl: { message } }) => (message && message.content) || message,
  getState: (key, _message) => {
    const message = Message._message(_message)
    return { status: key, message }
  }
};

const intialState = {
  serverStatus: {},
  notify: { message: null, status: null },
  isSocket: false
};

export const serverStatus = (state = intialState.serverStatus, action) => {
  if (action.request)
    return { ...state, [action.request]: true };
  if (action.success)
    return { ...state, [action.success]: false };
  if (action.failure)
    return { ...state, [action.failure]: false };
  return state;
};

export const notify = (state = intialState.notify, action) => {
  if (action.error)
    return Message.getState('error', action);
  if (action.success)
    return Message.getState('success', action);
  switch (action.type) {
    default: return state;
  }
};

export const isSocket = (state = intialState.isSocket, action) => {
  switch (action.type) {
    case sockets.CONNECT_MISSING:
    case sockets.CONNECT_FAILURE:
      return false;
    case sockets.CONNECT_SUCCESS:
      return true;
    default: return state;
  }
};

export default combineReducers({
  serverStatus,
  notify,
  isSocket
});
