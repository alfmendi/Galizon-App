import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";
import { useRouter } from "next/router";

import styled from "@emotion/styled";

import { useSession, signIn, signOut } from "next-auth/react";

import { useHorizontalScroll } from "../hooks/useHorizontalScroll";

import Badge from "@mui/material/Badge";

import { setBuscarAction } from "../redux/buscarSlice";

import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

// ------------------------------------------------------
// ------------------------------------------------------
// - Componente para mostrar el header de la aplicación -
// ------------------------------------------------------
// ------------------------------------------------------
const Header = () => {
  const { productos } = useSelector((state) => state.cesta);
  const { texto } = useSelector((state) => state.buscar);

  const dispatch = useDispatch();

  const { data: session } = useSession();

  const scrollRef = useHorizontalScroll();

  const router = useRouter();

  const [menuLateral, setMenuLateral] = useState(false);
  const [menuUsuario, setMenuUsuario] = useState(false);

  const [textoAuxiliar, setTextoAuxiliar] = useState(texto !== "" ? texto : "");

  // ---------------------------------------------------------------------------------
  // - UseEffect para permitir el scroll horizontal con el ratón en el menú superior -                                     -
  // ---------------------------------------------------------------------------------
  useEffect(() => {
    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (menuLateral) {
      if (typeof window != "undefined" && window.document) {
        document.body.style.overflow = "hidden";
      }
    } else {
      // Unsets Background Scrolling to use when SideDrawer/Modal is closed
      document.body.style.overflow = "unset";
    }
  }, [menuLateral]);

  // -----------------------------------------------------------------
  // - Función reductora para obtener la cantidad total de productos -
  // -----------------------------------------------------------------
  const cantidad = productos.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  // ----------------------------------------------------------------------------
  // - Función para mostrar/ocultar el menú lateral tras pulsar el botón 'Todo' -
  // ----------------------------------------------------------------------------
  const mostrarMenuLateral = () => {
    setMenuLateral((prev) => !prev);
    setMenuUsuario(false);
  };

  // ----------------------------------------------------------------
  // - Función para mostrar/ocultar el menú de usuario '(Hola,...)' -
  // ----------------------------------------------------------------
  const mostrarMenuUsuario = () => {
    setMenuUsuario((prev) => !prev);
  };

  // ---------------------------------------------
  // - Función para ir a la página 'Mis pedidos' -
  // ---------------------------------------------
  const mostrarMisPedidos = () => {
    setMenuUsuario(false);
    router.push("/pedidos");
  };

  // ---------------------------------------------
  // - Función para ir a la página 'Mis pedidos' -
  // ---------------------------------------------
  const manejarTextoBuscar = () => {
    if (textoAuxiliar.trim() !== "") {
      dispatch(setBuscarAction(textoAuxiliar));
      if (router.route !== "/") {
        router.push("/");
      }
    } else {
      dispatch(setBuscarAction(""));
    }
  };

  // ----------------------------------------------------------------
  // - Función para establecer el texto a buscar con la tecla enter -
  // ----------------------------------------------------------------
  const manejarPulsarEnter = async (event) => {
    if (event.key === "Enter" && textoAuxiliar.trim() !== "") {
      dispatch(setBuscarAction(textoAuxiliar));
      if (router.route !== "/") {
        router.push("/");
      }
    } else {
      dispatch(setBuscarAction(""));
    }
  };

  // -------
  // - JSX -
  // -------
  return (
    <Contenedor>
      <FondoOscuro
        className={`${menuLateral || menuUsuario ? "abierto" : null}`}
      ></FondoOscuro>
      <MenuLateral className={`${menuLateral ? "abierto" : null}`}>
        <TextoMenuLateral className={`${menuLateral ? "abiertoTexto" : null}`}>
          <BotonCerrar onClick={mostrarMenuLateral}>X</BotonCerrar>
          <Cabecera>
            <p onClick={!session ? signIn : signOut}>
              Hola,{" "}
              {session ? `${session.user.name.split(" ")[0]}` : "Identifícate"}
            </p>
          </Cabecera>
          <OpcionesMenu>
            <p>Los más vendidos</p>
            <p>Amazon Basics</p>
            <p>Atención al Cliente</p>
            <p>Ofertas</p>
            <p>Últimas Novedades</p>
            <p>Música</p>
            <p>Prime</p>
            <p>eBooks Kindle</p>
            <p>Informática</p>
            <p>Audible</p>
            <p>Moda</p>
            <p>Libros</p>
            <div style={{ borderBottom: "1px solid #ddd" }}></div>
            <p onClick={!session ? signIn : signOut}>
              {session ? "Salir" : "Identifícate"}
            </p>
          </OpcionesMenu>
        </TextoMenuLateral>
      </MenuLateral>
      <Superior>
        <Logo onClick={() => router.push("/")}>
          <Image
            src="/galizon-logo.png"
            height={40}
            width={120}
            objectFit="contain"
            alt="logo de galizon"
          />
        </Logo>
        <Buscar>
          {textoAuxiliar.trim().length > 0 && (
            <BorrarTexto
              onClick={() => {
                setTextoAuxiliar("");
                dispatch(setBuscarAction(""));
              }}
            >
              x
            </BorrarTexto>
          )}
          <input
            type="text"
            value={textoAuxiliar}
            onChange={(e) => setTextoAuxiliar(e.target.value)}
            onKeyDown={(e) => manejarPulsarEnter(e)}
          />
          <div>
            <SearchIcon onClick={manejarTextoBuscar} />
          </div>
        </Buscar>
        <Derecha>
          <InfoUsuario onClick={mostrarMenuUsuario}>
            <p>
              Hola,{" "}
              {session ? `${session.user.name.split(" ")[0]}` : "Identifícate"}
            </p>
            <h5>Cuenta y listas</h5>
          </InfoUsuario>
          <MenuUsuario className={`${menuUsuario ? "abierto" : null}`}>
            <TextoMenuUsuario
              className={`${menuUsuario ? "abiertoTexto" : null}`}
            >
              <BotonCerrarMenuUsuario onClick={mostrarMenuUsuario}>
                X
              </BotonCerrarMenuUsuario>
              <OpcionesMenuUsuario>
                {!session && (
                  <p onClick={!session ? signIn : null}>Identifícarse</p>
                )}
                <p onClick={mostrarMisPedidos}>Mis Pedidos</p>
                {session && (
                  <p onClick={session ? signOut : null}>Cerrar Sesión</p>
                )}
              </OpcionesMenuUsuario>
            </TextoMenuUsuario>
          </MenuUsuario>
          <Devoluciones>
            <p>Devoluciones</p>
            <h5>y Pedidos</h5>
          </Devoluciones>
          <Carrito onClick={() => router.push("/verificar")}>
            <StyledBadge badgeContent={cantidad} color="warning" showZero>
              <ShoppingCartOutlinedIcon />
            </StyledBadge>
          </Carrito>
        </Derecha>
      </Superior>
      <Inferior ref={scrollRef}>
        <div onClick={mostrarMenuLateral}>
          <MenuIcon />
          <p>Todo</p>
        </div>
        <div>
          <p>Los más vendidos</p>
        </div>
        <div>
          <p>Amazon Basics</p>
        </div>
        <div>
          <p>Atención al Cliente</p>
        </div>
        <div>
          <p>Ofertas</p>
        </div>
        <div>
          <p>Últimas Novedades</p>
        </div>
        <div>
          <p>Música</p>
        </div>
        <div>
          <p>Prime</p>
        </div>
        <div>
          <p>eBooks Kindle</p>
        </div>
        <div>
          <p>Informática</p>
        </div>
        <div>
          <p>Audible</p>
        </div>
        <div>
          <p>Moda</p>
        </div>
        <div>
          <p>Libros</p>
        </div>
      </Inferior>
    </Contenedor>
  );
};

export default Header;

// ---------------------
// - Styled Components -
// ---------------------
const Contenedor = styled.header`
  position: relative;
  width: 100%;
`;

const FondoOscuro = styled.div`
  z-index: 900;
  position: absolute;
  top: 0;
  left: 0;
  background: #333;
  opacity: 0.5;

  &.abierto {
    width: 100vw;
    height: 100vh;
  }
`;

const MenuLateral = styled.div`
  z-index: 1000;
  position: absolute;
  width: 0px;
  top: 100px;
  left: 0;
  background: #fff;
  transition: all 0.5s ease-in-out;
  white-space: nowrap;
  overflow: hidden;

  &.abierto {
    width: 320px;
  }
`;

const TextoMenuLateral = styled.div`
  position: relative;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;

  &.abiertoTexto {
    opacity: 1;
    visibility: visible;
  }
`;

const Cabecera = styled.div`
  background: #f3a847;

  p {
    padding: 0.5rem;
    cursor: pointer;
  }
`;

const OpcionesMenu = styled.div`
  display: flex;
  flex-direction: column;

  p {
    transition: 0.2s ease-in-out;
    padding: 0.2rem 1rem;

    &:hover {
      cursor: pointer;
      background: #ddd;
    }
  }
`;

const BotonCerrar = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  border: none;
  outline: none;
  background: #f3a847;
  color: #121921;
  padding: 0.2rem;
`;

// -----------------------------
// - Parte superior del header -
// -----------------------------
const Superior = styled.div`
  position: relative;
  height: 60px;
  background: #121921;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0rem 1.5rem 0rem 1rem;

  /* Media Query para dispositivos móviles */
  @media (max-width: 480px) {
    height: 100px;
    padding: 0.7rem 1rem 0.7rem 0.5rem;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  cursor: pointer;

  /* Media Query para dispositivos móviles */
  @media (max-width: 480px) {
    width: 90px;
    height: 30px;
  }
`;

const Buscar = styled.div`
  position: relative;
  flex: 1;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    flex: 1;
    height: 100%;
    outline: none;
    border: none;
    font-family: poppins;
    padding: 0rem 2.5rem 0rem 1rem;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  div {
    height: 100%;
    width: 40px;
    background: #f3a847;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    svg {
      font-size: 2rem;
      color: #243040;
    }

    &:hover {
      opacity: 0.9;
    }
  }

  /* Media Query para dispositivos móviles */
  @media (max-width: 480px) {
    position: absolute;
    height: 35px;
    bottom: 0.5rem;
    margin-left: auto;
    margin-right: auto;
    left: 0.5rem;
    right: 0.5rem;

    div {
      svg {
        font-size: 1.5rem;
      }
    }
  }
`;

const BorrarTexto = styled.span`
  position: absolute;
  top: 5px;
  right: 45px;
  width: 30px;
  height: 30px;
  background: #333;
  color: #fff;
  border-radius: 3px;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;

  animation-name: animacionBotonBorrarTexto;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-direction: alternate;

  /* Media Query para dispositivos móviles */
  @media (max-width: 480px) {
    height: 22px;
    width: 22px;
    font-size: 14px;
    top: 6px;
    right: 45px;
  }

  /* The animation code */
  @keyframes animacionBotonBorrarTexto {
    from {
      background-color: #333;
      color: #fff;
    }
    to {
      background-color: #f3a847;
      color: #333;
    }
  }
`;

const Derecha = styled.div`
  position: relative;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  white-space: nowrap;

  p {
    font-size: 12px;
    margin-bottom: -5px;
  }

  h5 {
    font-size: 14px;
  }

  /* Media Query para dispositivos móviles */
  @media (max-width: 768px) {
    p {
      margin-bottom: 0px;
    }

    h5 {
      display: none;
    }
  }
`;

const InfoUsuario = styled.div`
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    color: #f3a847;
  }
`;

const MenuUsuario = styled.div`
  z-index: 1000;
  position: absolute;
  width: 120px;
  height: 0px;
  top: 50px;
  left: -5px;
  background: #fff;
  transition: all 0.3s ease-in-out;
  white-space: nowrap;
  overflow: hidden;

  &.abierto {
    height: 100px;
  }

  /* Media Query para dispositivos móviles */
  @media (max-width: 480px) {
    top: 30px;
  }
`;

const TextoMenuUsuario = styled.div`
  position: relative;
  opacity: 0;
  visibility: hidden;
  transition: 0.2s;
  color: #333;

  &.abiertoTexto {
    opacity: 1;
    visibility: visible;
  }
`;

const BotonCerrarMenuUsuario = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  border: none;
  outline: none;
  background: #f3a847;
  color: #333;
  padding: 0.2rem;
`;

const OpcionesMenuUsuario = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding-top: 1rem;

  p {
    font-size: 14px;
    transition: 0.3s ease-in-out;
    padding: 0.5rem 1rem;

    &:hover {
      cursor: pointer;
      color: #f3a847;
    }
  }
`;

const Devoluciones = styled.div`
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    color: #f3a847;
  }

  /* Media Query para dispositivos móviles */
  @media (max-width: 768px) {
    display: none;
  }
`;
const Carrito = styled.div`
  position: relative;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    font-size: 2rem;
  }
`;

const StyledBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    color: "#121921",
    backgroundColor: "#f3a847",
    fontFamily: "poppins",
    fontWeight: "600",
  },
});

// -----------------------------
// - Parte inferior del header -
// -----------------------------
const Inferior = styled.div`
  height: 40px;
  background: #232e3e;
  color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0rem 1rem;
  gap: 1.5rem;
  white-space: nowrap;
  overflow-x: auto;

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    p {
      font-size: 14px;
    }

    &:hover {
      color: #f3a847;
    }
  }
`;
