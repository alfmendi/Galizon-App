import mongoose from "mongoose";

// --------------------------------------------------------------------
// - Schema para definir la estructura de la colección (tabla) Pedido -
// --------------------------------------------------------------------
const PedidoSchema = new mongoose.Schema(
  {
    pedidoStripeId: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Pedido || mongoose.model("Pedido", PedidoSchema);
