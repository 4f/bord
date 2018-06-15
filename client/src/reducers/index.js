import { combineReducers } from 'redux';

import columns   from './columns';
import cards     from './cards';
import bords     from './bords';
import services  from './services';

export default combineReducers({
  columns,
  bords,
  cards,
  services
});
