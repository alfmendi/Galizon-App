import Head from "next/head";
import { useRouter } from "next/router";

import styled from "@emotion/styled";

import { useSession, getSession } from "next-auth/react";

import Stripe from "stripe";

import Header from "../componentes/Header";
import Pedido from "../componentes/Pedido";

import HomeIcon from "@mui/icons-material/Home";

// ----------------------------------------------------
// ----------------------------------------------------
// - Componente para mostrar la página de mis pedidos -
// ----------------------------------------------------
// ----------------------------------------------------
const Pedidos = ({ pedidosStripeConImagen }) => {
  const router = useRouter();

  const { data: session } = useSession();

  // -------
  // - JSX -
  // -------
  return (
    <Contenedor>
      <Head>
        <title>Mis Pedidos</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Principal>
        <Tarjeta>
          <BotonInicio onClick={() => router.push("/")}>
            <HomeIcon />
            Inicio
          </BotonInicio>
          <h1>Tus Pedidos</h1>
          {session ? (
            <h3>
              {pedidosStripeConImagen.length}{" "}
              {pedidosStripeConImagen.length === 1 ? "Pedido" : "Pedidos"}
            </h3>
          ) : (
            <h3>Identifícate para ver tus pedidos</h3>
          )}
          {pedidosStripeConImagen?.map((pedido) => (
            <Pedido key={pedido.id} pedido={pedido} />
          ))}
        </Tarjeta>
      </Principal>
    </Contenedor>
  );
};

export default Pedidos;

// -----------------------------------------------------------------------
// - Función para obtener los objetos de cada pedido presentes en Stripe -
// -----------------------------------------------------------------------
export const getServerSideProps = async (contexto) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const session = await getSession(contexto);

  // Conseguir credenciales del usuario
  if (!session) {
    return {
      props: {},
    };
  }

  // Conseguir las entradas en mi BBDD de ese usuario
  // const pedidosMongoDB = await fetch(
  //   `http://localhost:3000/api/pedidos/?email=${session.user.email}`
  // ).then((res) => res.json());

  const pedidosMongoDB = await fetch(
    `${process.env.HOST}/api/pedidos/?email=${session.user.email}`
  ).then((res) => res.json());

  // Conseguir la información de cada entrada anterior en stripe
  const pedidosStripe = await Promise.all(
    pedidosMongoDB.map(async (pedido) => {
      return {
        id: pedido._id,
        updatedAt: pedido.updatedAt,
        total: pedido.total,
        productos: (
          await stripe.checkout.sessions.listLineItems(pedido.pedidoStripeId, {
            limit: 100,
          })
        ).data,
      };
    })
  );

  // Añadir la imagen a cada producto de la lista de pedidos
  const pedidosStripeConImagen = await Promise.all(
    pedidosStripe.map(async (pedido) => {
      const productosConImagen = await Promise.all(
        pedido.productos.map(async (producto) => {
          const productoConImagen = await stripe.products.retrieve(
            producto.price.product
          );

          const nuevoProducto = {
            precio_total: producto.amount_total / 100,
            cantidad: producto.quantity,
            nombre: producto.description,
            imagen: productoConImagen?.images[0],
          };
          return nuevoProducto;
        })
      );
      return {
        id: pedido.id,
        total: pedido.total,
        updatedAt: pedido.updatedAt,
        productosConImagen,
      };
    })
  );

  return {
    props: {
      pedidosStripeConImagen,
    },
  };
};

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
  flex-direction: column;
  gap: 1rem;

  h1 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #ccc;
  }

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
