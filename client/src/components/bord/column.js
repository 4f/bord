import React, { Component } from 'react';
import Card  from './card'
import Modal from './modal'

class Column extends Component {
  state = { dragover: 0, modal: {}, name: null, modalShow: false };

  closeModal = () => { this.setState({ modalShow: false }) };

  createCard     = () => {
    const { actions: { Cards: { create } } } = this.props;
    create({ title: this.state.name, column_id: this.props.column.id });
    this.closeModal();
  }

  remove     = () => {
    const { actions: { Columns: { remove } }, column: {id} } = this.props;
    remove({ id });
    this.closeModal();
  }
  update     = () => {
    const { actions: { Columns: { update } }, column } = this.props;
    update({...column, title: this.state.name });
    this.closeModal();
  }

  onFieldChange = (e) => {
    e.persist();
    this.setState({ name: e.target.value });
  };
  onAddCard = (e) => {
    const modal = { title:  `Add new Card.`, submit: this.createCard };
    this.setState({ modalShow: true, modal, name: "New Card"});
  };

  onRemove = (e) => {
    const modal = { title:  `Remove Column ${this.props.column.title}?`, submit: this.remove };
    this.setState({ modalShow: true, modal, name: null});
  };
  onEdit = (e) => {
    const modal = { title:  `Edit Column ${this.props.column.title}?`, submit: this.update };
    this.setState({ modalShow: true, modal, name: this.props.column.title});
  };

  onDragEnter = (e) => this.setState({ dragover: this.state.dragover + 1 });
  onDragLeave = (e) => this.setState({ dragover: this.state.dragover - 1 });
  onDrop      = (e) => this.props.dropCard(this.props.column);
  onDragOver  = (e) => e.preventDefault();



  render() {
    const {column: {title}, cards = {}, card_ids = [], actions: {Cards}, dragCard} = this.props;
    return (
      <React.Fragment>
        <Modal
          show={this.state.modalShow}
          modal={this.state.modal}
          name={this.state.name} 
          close={this.closeModal}
          change={this.onFieldChange}
        />
        <div
          className={"col w400" + ( this.state.dragover > 0 ? ' dragover' : '' )}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          onDragOver={this.onDragOver}
          onDrop={this.onDrop}
        >
          <div className="col-command col-hover">
            <button onClick={this.onEdit} type="button" className="btn btn-light btn-sm">
              Edit
            </button>
            <button onClick={this.onAddCard} type="button" className="btn btn-light btn-sm">
              Add
            </button>
          </div>
          <button
            className="close col-close col-hover"
            onClick={this.onRemove}
            type="button"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <h3>{title}</h3>
            { card_ids.map(id =>
          <Card
            key        = {id}
            card       = {cards[id]}
            actions    = {{Cards}}
            drag       = {dragCard}
          />
            )}
        </div>
      </React.Fragment>
    )
  }
}

export default Column;
