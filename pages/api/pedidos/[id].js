import dbConnect from "../../../util/mongo";

import Pedido from "../../../model/Pedido";

// ------------------------------------------
// - Manejador para la ruta /api/pedidos/id -
// ------------------------------------------
const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const pedido = await Pedido.findById(id);
      res.status(200).json(pedido);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    try {
      const pedido = await Pedido.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(pedido);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    try {
      const pedido = await Pedido.findByIdAndRemove(id);
      res.status(200).json(pedido);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
