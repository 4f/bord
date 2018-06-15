import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Actions from '../actions';
import Services from '../actions/services';

import Bord  from '../components/bord';


const mapState = state => {
  return {
    bord:           state.bords,
    columns:        state.columns,
    cards:          state.cards.hash,
    cardsByColums:  state.cards.byColumns
  }
}

const mapDispatch = dispatch => ({
  actions: {
    Bords:    bindActionCreators(Actions.bords,     dispatch),
    Columns:  bindActionCreators(Actions.columns,   dispatch),
    Cards:    bindActionCreators(Actions.cards,     dispatch),
    Sockets:  bindActionCreators(Actions.sockets,   dispatch),
    redirect: bindActionCreators(Services.redirect, dispatch)   

  }
});

export default connect(mapState, mapDispatch)(Bord);
