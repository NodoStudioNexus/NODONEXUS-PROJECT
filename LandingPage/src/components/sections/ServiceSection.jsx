import React from "react";
import { useSelector } from "react-redux";
import CardService from "../common/CardService";

const ServiceSection = () => {
  const { serviceData } = useSelector((store) => store.serviceData);

  return (
    <>
      <div className="containerService">
        <div className="containerService__info">
          <div className="containerService__info__title">
            <h2>01</h2>
            <h3>Nuestros Servicios</h3>
          </div>
          <div className="containerService__info__text">
            <p>
              <span>Diseñamos y desarrollamos software a tu medida. </span>
              Nos adaptamos a las necesidades únicas de tu negocio, desde las
              grandes empresas hasta los nuevos emprendimientos. Creemos en la
              importancia de una comunicación cercana y transparente para
              construir soluciones que realmente funcionen para ti.
            </p>
          </div>
        </div>
        <div className="containerService__cardsService">
          {serviceData.map((info) => (
            <div key={info.id}>
              <CardService
                title={info.title}
                imgURL={info.imgURL}
                description={info.description}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServiceSection;
