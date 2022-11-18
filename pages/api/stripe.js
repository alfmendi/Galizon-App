import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// --------------------------------------
// - Manejador para la ruta /api/stripe -
// --------------------------------------
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        customer_email: req.body.email,
        shipping_address_collection: {
          allowed_countries: ["ES"],
        },
        phone_number_collection: {
          enabled: true,
        },
        // shipping_options: [{ shipping_rate: "shr_1Kn3IaEnylLNWUqj5rqhg9oV" }],
        line_items: req.body.productos.map((producto) => {
          return {
            // description: producto.description,
            quantity: producto.cantidad,
            price_data: {
              currency: "eur",
              product_data: {
                name: producto.title,
                images: [producto.image],
              },
              unit_amount: producto.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
          };
        }),
        success_url: `${req.headers.origin}/pagoCorrecto`,
        // En caso de cancelar la operación, vuelvo a la página de verificar
        cancel_url: `${req.headers.origin}/verificar`,
        // No paso metadata
        //metadata: { email: req.body.email },
      };

      // Crear Checkout Session con los parámetros
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
