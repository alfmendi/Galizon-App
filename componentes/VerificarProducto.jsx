import { useDispatch } from "react-redux";

import Image from "next/image";

import styled from "@emotion/styled";

import {
  addProductoCestaAction,
  eliminarProductoCestaAction,
} from "../redux/cestaSlice";

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// - Componente para mostrar la información del producto que se va a añadir a la cesta (checkout) -
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
const VerificarProducto = ({ producto }) => {
  const dispatch = useDispatch();

  // --------------------------------------------------------------------------------
  // - Función para disminuir la cantidad de ese producto que se añadirá a la cesta -
  // --------------------------------------------------------------------------------
  const reducirCantidad = () => {
    dispatch(eliminarProductoCestaAction({ id: producto.id }));
  };

  // -------------------------------------------------------------------------------
  // - Función para aumentar la cantidad de ese producto que se añadirá a la cesta -
  // -------------------------------------------------------------------------------
  const aumentarCantidad = () => {
    dispatch(addProductoCestaAction({ id: producto.id }));
  };

  // -------
  // - JSX -
  // -------
  return (
    <Contenedor>
      <Izquierda>
        <Image
          src={producto.image}
          width={200}
          height={200}
          objectFit="contain"
          alt="producto"
        />
      </Izquierda>
      <Centro>
        <p>{producto.title}</p>
        <Contador>
          <Boton onClick={reducirCantidad}>-</Boton>
          <span>{producto.cantidad}</span>
          <Boton onClick={aumentarCantidad}>+</Boton>
        </Contador>
      </Centro>
      <Derecha>
        <h3>{producto.price}€</h3>
      </Derecha>
    </Contenedor>
  );
};

export default VerificarProducto;

// ---------------------
// - Styled Components -
// ---------------------
const Contenedor = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0rem;
  border-bottom: 1px solid #ccc;
  margin-bottom: 0.5rem;

  /* Media Query para dispositivos móviles */
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Izquierda = styled.div`
  flex: 1;

  /* Media Query para dispositivos móviles */
  @media (max-width: 480px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Centro = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Derecha = styled.div`
  text-align: right;
  flex: 1;
`;

const Contador = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    width: 30px;
    text-align: center;
    border-radius: 3px;
    background: #f3a847;
  }
`;

const Boton = styled.button`
  width: 25px;
  height: 25px;
  font-family: "poppins";
  font-weight: 600;
  font-size: 1rem;
  outline: none;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 14px 26px -12px hsl(0deg 0% 60% / 42%),
      0 4px 23px 0 rgb(0 0 0 / 12%), 0 8px 10px -5px hsl(0deg 0% 60% / 20%);
  }
`;
