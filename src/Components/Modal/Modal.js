import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

export default class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleCloseModalByEscape);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleCloseModalByEscape);
  }

  handleCloseModalByEscape = (e) => {
    if (e.code === "Escape") {
      this.props.closeModal();
    }
  };

  handleCloseByBlackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div className={styles.overlay}>
        <div
          className={styles.modal}
          onClick={this.handleCloseByBlackdropClick}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
