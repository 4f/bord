import React, { Component } from 'react';

import Modal from './modal'

class Card extends Component {
  state = { modal: {}, name: null, modalShow: false };

  closeModal = () => { this.setState({ modalShow: false }) };

  remove     = () => {
    const { actions: { Cards: { remove } }, card: {id} } = this.props;
    remove({ id });
    this.closeModal();
  }
  update     = () => {
    const { actions: { Cards: { update } }, card } = this.props;
    update({...card, title: this.state.name });
    this.closeModal();
  }

  onFieldChange = (e) => {
    e.persist();
    this.setState({ name: e.target.value });
  };

  onRemove = (e) => {
    const modal = { title:  `Remove card ${this.props.card.title}?`, submit: this.remove };
    this.setState({ modalShow: true, modal, name: null});
  };
  onEdit = (e) => {
    const modal = { title:  `Edit card ${this.props.card.title}?`, submit: this.update };
    this.setState({ modalShow: true, modal, name: this.props.card.title});
  };

  onDragStart = () => this.props.drag(this.props.card);

  
  render() {
    const {card: {title}} = this.props;

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
          className="card margin8"
          draggable="true"
          onDragStart={this.onDragStart}
        >
          <button
            className="btn btn-light btn-sm card-edit card-hover"
            onClick={this.onEdit}
            type="button"
          >
            Edit
          </button>
          <button
            className="close card-close card-hover"
            type="button"
            aria-label="Close"
            onClick={this.onRemove}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Card;
