import React from "react";

const CardProject = ({ img, title, subTitle, browse }) => {
  return (
    <div className="containerCardProject">
      <div className="containerCardProject__img">
        <img src={img} alt={title} className="containerCardProject__imgFront" />
        <span className="containerCardProject__glass" />
        <img src={img} alt={title} className="containerCardProject__imgBG" />
      </div>
      <div className="containerCardProject__info">
        <h2>{title}</h2>
        <h4>{subTitle}</h4>
      </div>
    </div>
  );
};

export default CardProject;
