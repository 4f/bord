import React  from 'react';

const Modal = ({ modal: { title, submit}, change, close, show, name}) => (
  <div className={show ? "bg-modal-show" : "bg-modal-hide"}>
    <div className="modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">{title}</h5>
            <button type="button" className="close" aria-label="Close" onClick={close}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
            { name !== null &&
          <div className="modal-body">
            <div className="form-group">
              <input onChange={change} type="text" className="form-control" value={name} />
            </div>
          </div>
            }
          <div className="modal-footer">
            <button onClick={close}  type="button" className="btn btn-secondary">Close</button>
            <button onClick={submit} type="button" className="btn btn-primary">Ok</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// const Input =

export default Modal;
