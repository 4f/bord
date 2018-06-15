import { combineReducers } from 'redux'

import types   from '../constants'
import sockets from '../constants/sockets'


const initialState = {
  hash:      {},
  byColumns: {}
}


const isChangeColumn = ({ pl: { card: { old_column_id, column_id } } }) => old_column_id && old_column_id !== column_id;

const normalize = ({pl: {cards = []}}) => {
  let newState = {};
  cards.forEach( card => newState[card.id] = card );
  return newState;
}
const normalizeByColumns = ({pl: {cards = []}}) => {
  let newState = {};
  cards.forEach(card => newState[card.column_id] = (newState[card.column_id] || []).concat(card.id) );
  return newState;
}
const removeFromColumn = (state, {pl: {card: {id, column_id, old_column_id}}}) => {
  let columnId = old_column_id || column_id;
  let newState;
  if (state[columnId]){
    newState = {...state};
    newState[columnId] = state[columnId].filter(card_id => card_id !== id);
    return newState;
  }
  return state;
}
const createFromColumn = (newState, {pl: {card: {column_id, id}}}) => {
  newState[column_id] = (newState[column_id] || []).concat(id);
  return newState;
}


const hash =  (state = initialState.hash, action) => {
  let newState;
  switch (action.type) {
    case types.bords.get.SUCCESS:
      return normalize(action);

    // case types.cards.remove.SUCCESS:
    case sockets.CARD_REMOVE:
      newState = {...state};
      delete newState[action.pl.card.id];
      return state;

    // case types.cards.update.SUCCESS:
    case sockets.CARD_UPDATE:
      newState = {...state};
      newState[action.pl.card.id] = action.pl.card;
      return newState;

    // case types.cards.create.SUCCESS:
    case sockets.CARD_CREATE:
      return {...state, [action.pl.card.id]: action.pl.card };

    default: return state;
  }
}

const byColumns = (state = initialState.byColumns, action) => {
  let newState;
  switch (action.type) {
    case types.bords.get.SUCCESS:
      return normalizeByColumns(action);

    // case types.cards.remove.SUCCESS:
    case sockets.CARD_REMOVE:
      return removeFromColumn(state, action);

    // case types.cards.update.SUCCESS:
    case sockets.CARD_UPDATE:
      if ( isChangeColumn(action) ) {
        newState = createFromColumn({ ...state }, action);
        newState = removeFromColumn(newState, action);
        return newState;
      }
      return state;

    // case types.cards.create.SUCCESS:
    case sockets.CARD_CREATE:
      return createFromColumn({...state}, action);

    default: return state;
  }
}




export default combineReducers({
  hash,
  byColumns
})
