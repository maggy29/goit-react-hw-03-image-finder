import React from "react";
import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ image, handleShowModal }) {
  const { webformatURL, tags, largeImageURL } = image;
  return (
    <li className={styles.container}>
      <img
        src={webformatURL}
        alt={tags}
        className={styles.image}
        height="180px"
        onClick={() => handleShowModal(largeImageURL, tags)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleShowModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
