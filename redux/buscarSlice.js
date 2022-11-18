// ------------------------------------------------------------------
// - Slice para definir el apartado buscar dentro del store         -
// - Permite almacenar el valor introducido en el input de busqueda -
// - y pasarlo a los diferentes componentes que hacen uso de él     -
// ------------------------------------------------------------------
import { createSlice } from "@reduxjs/toolkit";

const buscarSlice = createSlice({
  name: "buscar",
  initialState: {
    texto: "",
  },
  reducers: {
    setBuscarAction: (state, action) => {
      state.texto = action.payload;
    },
  },
});

export const { setBuscarAction } = buscarSlice.actions;

export default buscarSlice.reducer;
