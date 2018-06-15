import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {redirect} from '../actions/services'

import Bords from '../actions/bords';

import Home  from '../components/home';


const mapState = (state) => ({});

const mapDispatch = dispatch => ({
  actions: {
    Bords: bindActionCreators(Bords, dispatch),
    redirect: bindActionCreators(redirect, dispatch),   
  }
});

export default connect(mapState, mapDispatch)(Home);
