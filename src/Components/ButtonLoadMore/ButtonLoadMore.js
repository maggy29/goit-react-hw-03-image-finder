import React from "react";
import PropTypes from "prop-types";
import styles from "./ButtonLoadMore.module.css";

function ButtonLoadMore({ onClick }) {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      Load more
    </button>
  );
}

ButtonLoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonLoadMore;
