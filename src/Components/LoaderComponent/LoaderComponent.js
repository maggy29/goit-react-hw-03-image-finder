import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "./LoaderComponent.module.css";

export default function LoaderComponent() {
  return (
    <div className={styles.loader}>
      <Loader
        type="ThreeDots"
        color="#3f51b5"
        height={20}
        width={100}
        timeout={3000}
      />
    </div>
  );
}
