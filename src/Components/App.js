import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import imagesApi from "../services/imagesApi";

import LoaderComponent from "./LoaderComponent/LoaderComponent";
import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from "./Searchbar/Searchbar";
import ButtonLoadMore from "./ButtonLoadMore/ButtonLoadMore";
import Modal from "./Modal/Modal";

import "react-toastify/dist/ReactToastify.css";
import styles from "./App.module.css";

export default class App extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    notification: false,
    searchQuery: "",
    page: 1,
    showModal: false,
    largeImageURL: "",
    tags: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;
    if (prevState.searchQuery !== searchQuery) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    this.setState({ loading: true });
    const { searchQuery, page } = this.state;

    imagesApi
      .fetchImagesWithQuery(searchQuery, page)
      .then((images) => {
        if (images.length === 0) {
          this.handleNotification(
            "There are no matches, please enter another query!"
          );
        }
        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        }));
      })
      .catch((error) => this.setState({ error }))
      .finally(() => {
        this.setState({ loading: false });
        this.smooseScroll();
      });
  };

  handleSearchFormSubmit = (query) => {
    if (!query) {
      this.handleNotification("Please, enter Your query!");
    }
    this.setState({ searchQuery: query, page: 1, images: [] });
  };

  handleNotification = (notification) => {
    this.setState({ notification: true });
    toast.info(`${notification}`);
  };

  smooseScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  handleShowModal = (largeImageURL, tags) => {
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
      tags: tags,
    });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, loading, error, showModal } = this.state;

    return (
      <div className={styles.container}>
        <ToastContainer />

        {error &&
          toast.error(`Whoops, something went wrong: ${error.message}`, {})}
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        {images.length > 0 && !loading && (
          <ImageGallery
            images={images}
            handleShowModal={this.handleShowModal}
          />
        )}
        {loading && <LoaderComponent className={styles.loader} />}
        {images.length > 0 && <ButtonLoadMore onClick={this.fetchImages} />}
        {showModal && (
          <Modal closeModal={this.handleCloseModal}>
            <img
              className={styles.img}
              src={this.state.largeImageURL}
              alt={this.state.tags}
            />
          </Modal>
        )}
      </div>
    );
  }
}
