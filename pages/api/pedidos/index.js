import dbConnect from "../../../util/mongo";

import Pedido from "../../../model/Pedido";

// ---------------------------------------
// - Manejador para la ruta /api/pedidos -
// ---------------------------------------
const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const emailUsuario = req.query.email;
      const pedidos = await Pedido.find({ email: emailUsuario });
      res.status(200).json(pedidos);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const pedido = await Pedido.create(req.body);
      res.status(201).json(pedido);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
