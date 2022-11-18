import { useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import styled from "@emotion/styled";

import Header from "../componentes/Header";

import HomeIcon from "@mui/icons-material/Home";

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// - Componente para mostrar la página de pago realizado correctamente -
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
const PagoCorrecto = () => {
  const route = useRouter();

  // -------------------------------------------------------------------------------
  // - UseEffect para eliminar los objetos de la cesta almacenados en localStorage -
  // - Estan almacenados en localStorage para no perder su valor                   -
  // - al hacer un refresh de la página (F5)                                       -
  // -------------------------------------------------------------------------------
  useEffect(() => {
    localStorage.removeItem("productos");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // -------
  // - JSX -
  // -------
  return (
    <Contenedor>
      <Head>
        <title>Pago Correcto</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Principal>
        <Tarjeta>
          <BotonInicio onClick={() => route.push("/")}>
            <HomeIcon />
            Inicio
          </BotonInicio>
          <Cabecera>
            <h1>Gracias, tu pedido ha sido confirmado</h1>
          </Cabecera>
          <p>
            Te enviaremos un correo cuando tu pedido haya sido enviado. Si
            deseas comprobar el estado de tus pedidos, pulsa el botón inferior.
          </p>
          <Boton onClick={() => route.push("/pedidos")}>Mis pedidos</Boton>
        </Tarjeta>
      </Principal>
    </Contenedor>
  );
};

export default PagoCorrecto;

// ---------------------
// - Styled Components -
// ---------------------
const Contenedor = styled.div``;

const Principal = styled.main`
  /* max-width: 1536px; */
  max-width: 1200px;
  margin: 1rem auto;
  padding: 1rem;
`;

const Tarjeta = styled.div`
  position: relative;
  background: #fff;
  padding: 1rem;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;

  p {
    text-align: center;
  }

  /* Media Query para baja resolución:  Tablets, Ipads */
  @media (max-width: 480px) {
    p {
      font-size: 0.9rem;
    }
  }
`;

const BotonInicio = styled.button`
  font-family: "poppins";
  font-size: 12px;
  position: absolute;
  top: -36px;
  left: 0;
  border: none;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  background: #f3a847;
  padding: 0.2rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  transition: all 0.2s ease-in-out;

  svg {
    font-size: 1rem;
  }

  &:hover {
    box-shadow: 0 14px 26px -12px rgb(251 140 0 / 40%),
      0 4px 23px 0 rgb(251 140 0 / 15%), 0 8px 10px -5px rgb(251 140 0 / 20%);
  }
`;

const Cabecera = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  h1 {
    font-size: 1.8rem;
    font-weight: 600;
    text-align: center;
  }

  /* Media Query para dispositivos móviles */
  @media (max-width: 768px) {
    h1 {
      font-size: 1.2rem;
    }
  }

  /* Media Query para baja resolución:  Tablets, Ipads */
  @media (max-width: 480px) {
    h1 {
      font-size: 1rem;
    }
  }
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
