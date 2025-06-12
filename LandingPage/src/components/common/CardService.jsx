import React from "react";

const CardService = ({ title, imgURL, description }) => {
  return (
    <>
      <div className="containerCardService">
        <figure className="containerCardService__img">
          <img src={imgURL} alt={title} />
        </figure>
        <div className="containerCardService__info">
          <h2>{title}</h2>
          <h4>{description}</h4>
        </div>
      </div>
    </>
  );
};

export default CardService;
