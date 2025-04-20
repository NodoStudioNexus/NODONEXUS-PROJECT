import { JSX } from "react";
import { Route, Routes } from "react-router-dom";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const RoutesWhithNotFound = ({ children }: Props) => {
  return (
    <>
      <Routes>
        {children}
        <Route path="*" element={<div>NOT FOUNT(Pagina no encontrada)</div>} />
      </Routes>
    </>
  );
};

export default RoutesWhithNotFound;
