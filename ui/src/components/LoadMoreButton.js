import React from "react";
import "../styles/LoadMoreButtonStyles.css";

function LoadMoreButton({ onClick }) {
  return (
    <button className="load-more" onClick={onClick}>
      Load more
    </button>
  );
}

export default LoadMoreButton;
