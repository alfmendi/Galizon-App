import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import styled from "@emotion/styled";

import Producto from "./Producto";

// -----------------------------------------------
// -----------------------------------------------
// - Componente para mostrar todos los productos -
// -----------------------------------------------
// -----------------------------------------------
const Productos = ({ productos }) => {
  const { texto } = useSelector((state) => state.buscar);

  const [productosFiltro, setProductosFiltro] = useState([]);

  // ------------------------------------------------------------------------
  // - UseEffect para filtrar los productos a mostrar en caso de introducir -
  // - un texto en el input de busqueda                                     -
  // ------------------------------------------------------------------------
  useEffect(() => {
    if (texto.trim().length > 0) {
      setProductosFiltro(
        productos.filter((elemento) =>
          elemento.title.toLowerCase().includes(texto.trim().toLowerCase())
        )
      );
    } else {
      setProductosFiltro(productos);
    }
  }, [texto]); // eslint-disable-line react-hooks/exhaustive-deps

  // -------
  // - JSX -
  // -------
  return (
    <Contenedor>
      {texto && (
        <InfoBusqueda>
          {productosFiltro.length}{" "}
          {productosFiltro.length === 1 ? "resultado" : "resultados"} para
          &apos;{texto}&apos;
        </InfoBusqueda>
      )}
      {productosFiltro.map((producto) => (
        <Producto key={producto.id} producto={producto} />
      ))}
    </Contenedor>
  );
};

export default Productos;

// ---------------------
// - Styled Components -
// ---------------------
const Contenedor = styled.div`
  position: relative;
  display: grid;
  gap: 1rem;

  /* Media Query para dispositivos móviles */
  @media (max-width: 480px) {
    grid-template-columns: minmax(0, 1fr);
  }

  /* Media Query para baja resolución:  Tablets, Ipads */
  @media (min-width: 481px) and (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }

  /* Media Query para Tablets, Ipads en modo horizontal */
  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
    margin-top: -8rem;
  }

  /* Media Query para Laptops y Sobremesa */
  @media (min-width: 1025px) and (max-width: 1280px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
    margin-top: -8rem;
  }

  /* Media Query para pantallas Grandes */
  @media (min-width: 1281px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(
        0,
        1fr
      );
    margin-top: -8rem;
  }
`;

const InfoBusqueda = styled.div`
  position: absolute;
  top: -50px;
  left: 0;
  background: #fff;
  color: #888;
  font-size: 12px;
  padding: 0.5rem;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
