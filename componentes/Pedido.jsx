import Image from "next/image";

import styled from "@emotion/styled";

// -------------------------------------
// -------------------------------------
// - Componente para mostrar un pedido -
// -------------------------------------
// -------------------------------------
const Pedido = ({ pedido }) => {
  // -------
  // - JSX -
  // -------
  return (
    <Contenedor>
      <Cabecera>
        <div>
          <p>Fecha Pedido</p>
          <span>
            {new Date(pedido.updatedAt).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div>
          <p>Total</p>
          <h5>{pedido.total}€</h5>
        </div>
      </Cabecera>
      <ProductosPedido>
        {pedido.productosConImagen.map((productoConImagen) => (
          <ProductoPedido key={productoConImagen.nombre}>
            <Image
              src={productoConImagen.imagen}
              width={100}
              height={100}
              objectFit="contain"
              alt="imagen"
            />

            <ProductoInfo>
              <h5>{productoConImagen.nombre}</h5>
              <div>
                <p>Cantidad</p>
                <span>{productoConImagen.cantidad}</span>
              </div>
              <div>
                <p>Precio</p>
                <span>{productoConImagen.precio_total}€</span>
              </div>
            </ProductoInfo>
          </ProductoPedido>
        ))}
      </ProductosPedido>
    </Contenedor>
  );
};

export default Pedido;

// ---------------------
// - Styled Components -
// ---------------------
const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Cabecera = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ddd;
  border-radius: 3px;
  padding: 0.5rem;

  span {
    font-size: 12px;
  }

  h5 {
    font-size: 16px;
    background: #333;
    color: #f3a847;
    border-radius: 3px;
    padding: 0 0.5rem;
  }

  /* Media Query para dispositivos móviles */
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ProductosPedido = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #ddd;
  border-radius: 3px;
`;

const ProductoPedido = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  padding: 1rem;

  /* Media Query para dispositivos móviles */
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ProductoInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  h5 {
    font-weight: 400;
    font-size: 16px;
    padding: 0.5rem 0;
  }

  div {
    width: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  p {
    font-size: 14px;
    color: #777;
  }

  span {
    margin-left: 1rem;
    font-size: 12px;
    background: #333;
    color: #fff;
    border-radius: 3px;
    padding: 0 0.5rem;
  }

  /* Media Query para dispositivos móviles */
  @media (max-width: 480px) {
    div {
      width: 100%;
    }
  }
`;
