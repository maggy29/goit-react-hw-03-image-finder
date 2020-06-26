import React from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import styles from "./ImageGallery.module.css";

function ImageGallery({ images, handleShowModal }) {
  return (
    <ul className={styles.container}>
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          handleShowModal={handleShowModal}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleShowModal: PropTypes.func.isRequired,
};

export default ImageGallery;
