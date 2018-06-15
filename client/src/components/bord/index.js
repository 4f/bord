import React, { Component } from 'react';

import Modal from './modal'


import '../../styles/bord.css';

// import { columns2 as columns } from '../../mock'

import Column from "./column"


class Bord extends Component {
  state = { modal: {}, name: null, modalShow: false };

  closeModal = () => { this.setState({ modalShow: false }) };

  create     = () => {
    const { actions: { Columns: { create } } } = this.props;
    create({ title: this.state.name, bord_id: this.props.bord.id });
    this.closeModal();
  };

  onFieldChange = (e) => {
    e.persist();
    this.setState({ name: e.target.value });
  };

  onAdd = (e) => {
    const modal = { title:  `Add new Column.`, submit: this.create };
    this.setState({ modalShow: true, modal, name: "New Column"});
  };

  // onDragStart = (e) => { console.log('firs', e); this.setState({ drag: false }); };
  // onDragStop = (e) => { console.log('ends', e); };
  // onDrag = (e) => { };
  onDragCard = (card) => {
    console.log('firsCard', card);
    this.setState({ dragCard: card });
  }
  onDropCard = (column) => {
    const {dragCard} = this.state;
    const {actions: {Cards: {update} } } = this.props;
    console.log('firsColumn', column);
    if (dragCard.column_id !== column.id)
      update({...dragCard, column_id: column.id});
  }

  componentWillMount() {
    const { match: { params: { url } }, actions: { Bords: { get } } } = this.props;
    get({url})
      .then(d => {
        const {redirect, Sockets: {connect}} = this.props.actions;
        d.error ? redirect('/') : connect()
      });
  };
  componentWillReceiveProps({ match: { params: { id } } }) {
    // this.props.actions.Bords.get({ id });
  };

  constructor() {
    super()
    this.handles = {
      onDragCard: this.onDragCard.bind(this),
      onDropCard: this.onDropCard.bind(this)
    }
  }

  render() {
    let { bord, columns, cardsByColums, cards, actions: { Cards, Columns } } = this.props;
    return (
      <React.Fragment>
        <Modal
          show={this.state.modalShow}
          modal={this.state.modal}
          name={this.state.name} 
          close={this.closeModal}
          change={this.onFieldChange}
        />
        <div className="bord text-center">
          <h1>Columns</h1>
          <button
            className="btn btn-primary"
            onClick={this.onAdd}
            type="button"
          >
            Create Column
          </button>
          <div className="row no-wrap">
            { (bord.column_ids || []).map( id => (
              <Column
                key        = {id}
                column     = {columns[id]}
                cards      = {cards}
                card_ids   = {cardsByColums[id]}
                actions    = {{Cards, Columns}}
                dragCard   = {this.handles.onDragCard}
                dropCard   = {this.handles.onDropCard}
              />
            ) ) }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Bord;
