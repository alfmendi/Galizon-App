import { buffer } from "micro";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

import dbConnect from "../../util/mongo";

import Pedido from "../../model/Pedido";

// ---------------------------------------
// - Manejador para la ruta /api/webhook -
// ---------------------------------------
export default async function handler(req, res) {
  if (req.method === "POST") {
    // Conectar con la BBDD
    await dbConnect();

    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    // Verificar que el evento procede de Stripe
    try {
      if (!sig || !endpointSecret) return;
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
      // Manejar el evento checkout.session.completed
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        // Obtener los productos del pedido del cliente
        // const cliente = await stripe.customers.retrieve(session.customer);
        // Rellenar el pedido y almacenarlo en la BBDD...
        // console.log("----------Cliente...", cliente);
        // console.log("----------Session...", session);
        const pedidoAlmacenar = {
          pedidoStripeId: session.id,
          email: session.customer_email,
          total: session.amount_total / 100,
        };
        // console.log("----------Session...", session.id);
        // console.log("----------Session...", session.customer_email);
        // console.log("----------Session...", session.amount_total / 100);
        console.log("----------pedidoAlmacenar...", pedidoAlmacenar);

        const pedidoCreado = await Pedido.create(pedidoAlmacenar);
        // res.status(201).json(pedidoCreado);
        return res.status(200).send("Pedido almacenado en la BBDD");
      } else {
        return res.status(200).send();
      }
    } catch (err) {
      console.log("Error: ", err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
