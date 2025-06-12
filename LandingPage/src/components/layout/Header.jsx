import React, { useEffect, useState } from "react";

const Header = () => {
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const eventScroll = () => {
      if (window.scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };
    window.addEventListener("scroll", eventScroll);

    return () => {
      window.removeEventListener("scroll", eventScroll);
    };
  }, []);

  return (
    <>
      <div className={`containerHeader ${isScroll ? "scrolled" : ""}`}>
        <div className="containerHeader__logo">
          <h2>NODO</h2>
        </div>
        <div className="containerHeader__nav">
          <ul>
            <li>Servicios</li>
            <li>Proyectos</li>
            <li>Nosotros</li>
          </ul>
          <button>Contacto</button>
        </div>
      </div>
    </>
  );
};

export default Header;
