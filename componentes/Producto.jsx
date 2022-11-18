import Image from "next/image";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";

import { addProductoCestaAction } from "../redux/cestaSlice";

import styled from "@emotion/styled";

import Rating from "@mui/material/Rating";

// ---------------------------------------
// ---------------------------------------
// - Componente para mostrar un producto -
// ---------------------------------------
// ---------------------------------------
const Producto = ({ producto }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  // -----------------------------------------------------------------
  // - Función para añadir el producto a la cesta del store de redux -
  // -----------------------------------------------------------------
  const addProducto = () => {
    dispatch(addProductoCestaAction(producto));
  };

  // ---------------------------------------------------------------
  // - Función para ir a la página de un producto en concreto (id) -
  // ---------------------------------------------------------------
  const paginaProducto = () => {
    router.push(`/productos/${producto.id}`);
  };

  // -------
  // - JSX -
  // -------
  return (
    <Contenedor>
      <Categoria>{producto.category}</Categoria>
      <Imagen>
        <Image
          src={producto.image}
          width={200}
          height={200}
          objectFit="contain"
          alt={producto.title}
          onClick={paginaProducto}
        />
      </Imagen>
      <h4 onClick={paginaProducto}>{producto.title}</h4>
      <Valoracion>
        <Rating
          name="half-rating-read"
          defaultValue={producto.rating.rate}
          precision={0.1}
          readOnly
        />
        <p>{producto.rating.rate}</p>
      </Valoracion>
      <Descripcion>{producto.description}</Descripcion>
      <Precio>{producto.price}€</Precio>
      <Boton onClick={addProducto}>Añadir a la cesta</Boton>
    </Contenedor>
  );
};

export default Producto;

// ---------------------
// - Styled Components -
// ---------------------
const Contenedor = styled.div`
  z-index: 100;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  background: #fff;

  h4 {
    margin: 1rem 0rem;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
      color: #f3a847;
    }
  }
`;

const Categoria = styled.div`
  position: absolute;
  top: 5px;
  right: 15px;
  font-size: 12px;
  font-style: italic;
  color: #888;
`;

const Imagen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const Valoracion = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;

  p {
    font-size: 12px;
    font-weight: bold;
  }
`;

const Descripcion = styled.div`
  font-size: 12px;
  margin: 0.5rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Precio = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Boton = styled.button`
  font-family: "poppins";
  font-size: 14px;
  margin-top: auto;
  border: none;
  outline: none;
  background: #f3a847;
  padding: 0.5rem;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 14px 26px -12px rgb(251 140 0 / 40%),
      0 4px 23px 0 rgb(251 140 0 / 15%), 0 8px 10px -5px rgb(251 140 0 / 20%);
  }
`;
