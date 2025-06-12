import React from "react";
import { carrouselButtonData } from "../../data/carrouselButtonData";

const CarrouselButtons = () => {
  const carrouselData = [...carrouselButtonData, ...carrouselButtonData];
  return (
    <>
      <div className="containerCarrouselWrapper">
        <div className="containerCarrousel">
          {carrouselData.map((item, index) => (
            <button key={index} className="containerCarrousel__button">
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default CarrouselButtons;
