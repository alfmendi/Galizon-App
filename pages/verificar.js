import { useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { useSession, signIn } from "next-auth/react";

import { useDispatch, useSelector } from "react-redux";

import styled from "@emotion/styled";

import getStripe from "../lib/getStripe";

import Header from "../componentes/Header";
import VerificarProducto from "../componentes/VerificarProducto";

import { cargarProductosDesdeLocalStorage } from "../redux/cestaSlice";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// - Componente para mostrar la página de verificar la compra (checkout) -
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
const Verificar = () => {
  const { data: session } = useSession();

  const dispatch = useDispatch();

  const route = useRouter();

  const { productos } = useSelector((state) => state.cesta);

  // ------------------------------------------------------------------------------
  // - UseEffect para obtener los objetos de la cesta almacenados en localStorage -
  // - Estan almacenados en localStorage para no perder su valor                  -
  // - al hacer un refresh de la página (F5)                                      -
  // ------------------------------------------------------------------------------
  useEffect(() => {
    const productosLocalStorage = JSON.parse(localStorage.getItem("productos"));
    if (productosLocalStorage && productosLocalStorage.length > 0) {
      dispatch(
        cargarProductosDesdeLocalStorage(
          JSON.parse(localStorage.getItem("productos"))
        )
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ----------------------------------------------
  // - Función para obtener el total de productos -
  // ----------------------------------------------
  const cantidad = productos.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  // ----------------------------------------------------------
  // - Función para obtener el importe total de los productos -
  // ----------------------------------------------------------
  const importe = productos
    .reduce((total, producto) => total + producto.cantidad * producto.price, 0)
    .toFixed(2);

  // --------------------------------------------------------------------------
  // - Función para tramitar el pedido tras pulsar el botón 'tramitar pedido' -
  // --------------------------------------------------------------------------
  const tramitarPedido = async () => {
    if (!session) {
      signIn();
    }
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(productos),
      body: JSON.stringify({ productos, email: session.user.email }),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  // -------
  // - JSX -
  // -------
  return (
    <Contenedor>
      <Head>
        <title>Cesta</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Principal>
        <Izquierda>
          <Cesta>
            <BotonVolver onClick={() => route.push("/")}>
              <ArrowBackIosNewIcon />
              Volver
            </BotonVolver>
            <h1>{productos.length === 0 ? "Tu cesta está vacía" : "Cesta"}</h1>
            {productos.map((producto) => (
              <VerificarProducto key={producto.id} producto={producto} />
            ))}
            {productos.length > 0 && (
              <h3>
                Subtotal ({cantidad} {cantidad === 1 ? "producto" : "productos"}
                ): {importe}€
              </h3>
            )}
          </Cesta>
        </Izquierda>
        {productos.length > 0 && (
          <Derecha>
            <h5>
              Subtotal ({cantidad} {cantidad === 1 ? "producto" : "productos"}):{" "}
              {importe}€
            </h5>
            <Boton onClick={tramitarPedido}>Tramitar pedido</Boton>
            <InfoTarjeta>
              <h5>Datos para pruebas</h5>
              <div>
                <h6>Info de la tarjeta</h6>
                <p>4242 4242 4242 4242</p>
              </div>
              <div>
                <h6>MM/AA</h6>
                <p>12/24</p>
              </div>
              <div>
                <h6>CVC</h6>
                <p>123</p>
              </div>
            </InfoTarjeta>
          </Derecha>
        )}
      </Principal>
    </Contenedor>
  );
};

export default Verificar;

// ---------------------
// - Styled Components -
// ---------------------
const Contenedor = styled.div``;

const Principal = styled.main`
  max-width: 1536px;
  margin: 2rem auto;
  padding: 1rem;
  display: flex;
  gap: 1rem;

  /* Media Query para Tablets, Ipads en modo horizontal */
  /* Media Query para baja resolución:  Tablets, Ipads */
  /* Media Query para dispositivos móviles */
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const Izquierda = styled.div`
  flex: 1;
`;

const Cesta = styled.div`
  position: relative;
  background: #fff;
  padding: 1rem;

  h1 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #ccc;
  }

  h3 {
    text-align: right;
    font-size: 1rem;
  }

  /* Media Query para dispositivos móviles */
  @media (max-width: 480px) {
    h1 {
      font-size: 20px;
    }

    h3 {
      font-size: 12px;
    }
  }
`;

const BotonVolver = styled.button`
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

const Derecha = styled.div`
  height: 280px;
  min-width: 270px;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 1rem;

  h5 {
    text-align: right;
    white-space: nowrap;
    font-size: 14px;
  }

  /* Media Query para dispositivos móviles */
  @media (max-width: 480px) {
    h5 {
      font-size: 12px;
    }
  }
`;

const Boton = styled.button`
  font-family: "poppins";
  font-size: 14px;
  margin-top: auto;
  padding: 0.3rem 1rem;
  border: none;
  outline: none;
  border-radius: 3px;
  background: #f7ca02;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 14px 26px -12px rgb(251 140 0 / 40%),
      0 4px 23px 0 rgb(251 140 0 / 15%), 0 8px 10px -5px rgb(251 140 0 / 20%);
  }
`;

const InfoTarjeta = styled.div`
  margin-top: 1rem;
  font-size: 14px;
  border: 1px solid #333;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.5rem;

  h6 {
    font-size: 12px;
    color: #888;
    font-weight: 400;
  }
`;