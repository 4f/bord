import types   from '../constants'
import sockets from '../constants/sockets'


const initialState = {};


const deleteColumns = (newState, {pl: {column: {id}}}) => {
  let newColumns = [...newState.column_ids].filter(i => i !== id);
  newState.column_ids = newColumns;
  return newState;
};
const normalize = ({pl: {bord: {id, title}, columns, cards}}) => {
  let column_ids = (columns || []).map(c=>c.id).filter(c=>c);
  return { id, title, column_ids }
};


export default  (state = initialState, action) => {
  const isCurr = () => state.id === (action.pl.bord ? action.pl.bord.id : action.pl.column.bord_id)
  switch (action.type) {

    case types.bords.get.SUCCESS:
      return !isCurr() ? normalize(action) : state;

    case types.bords.update.SUCCESS:
      return isCurr() ? {...state, title: action.pl.board.title} : state;

    // case types.columns.create.SUCCESS:
    case sockets.COLUMN_CREATE:
      if ( isCurr() )
        return {
          ...state,
          column_ids: state.column_ids.concat(action.pl.column.id)
        };
      else
        return state;

    // case types.columns.remove.SUCCESS:
    case sockets.COLUMN_REMOVE:
      return isCurr() ? deleteColumns({ ...state}, action ) : state;

    default: return state;
  }
};
