import types   from '../constants'
import sockets from '../constants/sockets'

import { columns } from '../mock'


const initialState = columns || {};


const deleteCards = (newState, {pl: {card: {column_id, id, old_column_id}}}) => {
  column_id = old_column_id || column_id;
  let newCards = [...(newState[column_id].cards || [])].filter(i => i !== id);
  newState[column_id].cards = newCards;
  return newState;
}
const createCards = (newState, {pl: {card, card: {column_id, id}}}) => {
  let newCards = (newState[column_id].cards || []).concat(card);
  newState[column_id].cards = newCards;
  return newState;
}
const normalize = ({pl: { columns = [] }}) => {
  let newState = {};
  columns.map(column => newState[column.id] = column);
  return newState;
}


export default  (state = initialState, action) => {
  let newState;
  const isChangeColumn = ({ pl: { card: { old_column_id, column_id } } }) => old_column_id && old_column_id !== column_id;

  switch (action.type) {
    case types.bords.get.SUCCESS:
      return normalize(action);
    
    // case types.columns.remove.SUCCESS:
    case sockets.COLUMN_DELETE:
      newState = {...state};
      delete newState[action.pl.column.id];
      return state;

    // case types.columns.update.SUCCESS:
    case sockets.COLUMN_UPDATE:
      newState = {...state};
      newState[action.pl.column.id] = {...action.pl.column, cards: state[action.pl.column.id].cards};
      return newState;

    // case types.columns.create.SUCCESS:
    case sockets.COLUMN_CREATE:
      return {...state, [action.pl.column.id]: action.pl.column };

    
    // case types.cards.remove.SUCCESS:
    case sockets.CARD_REMOVE:
      return deleteCards({...state}, action);

    // case types.cards.update.SUCCESS:
    case sockets.CARD_UPDATE:
      if ( isChangeColumn(action) ) {
        newState = deleteCards({...state}, action);
        newState = createCards(newState, action);
        return newState;
      }
      return state;

    // case types.cards.create.SUCCESS:
    case sockets.CARD_CREATE:
      return createCards({...state}, action);

    default: return state;
  }
}
