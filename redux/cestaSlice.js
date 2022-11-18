// ---------------------------------------------------------------
// - Slice para definir el apartado cesta dentro del store       -
// - Permite almacenar todos los productos presentes en la cesta -
// - y pasarlo a los diferentes componentes que hacen uso de él  -
// ---------------------------------------------------------------
import { createSlice } from "@reduxjs/toolkit";

const cestaSlice = createSlice({
  name: "cesta",
  initialState: {
    productos: [],
  },
  reducers: {
    addProductoCestaAction: (state, action) => {
      // Compruebo si ese producto ya está en la cesta
      const existeProducto = state.productos.find(
        (producto) => producto.id === action.payload.id
      );
      // Si no existe el producto en state.productos, añadir el producto con cantidad 1
      if (!existeProducto) {
        const nuevoProducto = { ...action.payload, cantidad: 1 };
        state.productos = [...state.productos, nuevoProducto];
      } else {
        // Si existe el producto en state.productos, incrementar 1 al producto
        existeProducto.cantidad = existeProducto.cantidad + 1;
        state.productos = state.productos.map((producto) =>
          producto.id === action.payload.id ? existeProducto : producto
        );
      }
      localStorage.setItem("productos", JSON.stringify(state.productos));
    },
    eliminarProductoCestaAction: (state, action) => {
      // Compruebo si ese producto ya está en la cesta
      const existeProducto = state.productos.find(
        (producto) => producto.id === action.payload.id
      );
      // Si la cantidad es superior a 1, decremento en 1 la cantidad
      if (existeProducto.cantidad > 1) {
        existeProducto.cantidad -= 1;
        state.productos = state.productos.map((producto) =>
          producto.id === action.payload.id ? existeProducto : producto
        );
      } else {
        // Si la cantidad es 1, elimino el producto de la cesta
        state.productos = state.productos.filter(
          (elemento) => elemento.id !== action.payload.id
        );
      }
      if (state.productos.length === 0) {
        localStorage.removeItem("productos");
      } else {
        localStorage.setItem("productos", JSON.stringify(state.productos));
      }
    },
    cargarProductosDesdeLocalStorage: (state, action) => {
      state.productos = action.payload;
    },
  },
});

export const {
  addProductoCestaAction,
  eliminarProductoCestaAction,
  cargarProductosDesdeLocalStorage,
} = cestaSlice.actions;

export default cestaSlice.reducer;
