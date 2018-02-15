import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.css';

class Modal extends React.Component {
  static propTypes = {
    isModalOpened: PropTypes.bool.isRequired
  };

  render() {
    const { isModalOpened, toggleModal } = this.props;
    const ModalForm =
      <div className="modal modal-overlay" onClick={toggleModal}>
        <div className="modal-box">{this.props.children}</div>
      </div>;
    if (isModalOpened) {
      return ReactDOM.createPortal(ModalForm, document.getElementById('modal-root'));
    }
    return null;
  }
}

export default Modal;
