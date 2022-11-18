import { configureStore } from "@reduxjs/toolkit";

import cestaReducer from "./cestaSlice";
import buscarReducer from "./buscarSlice";

const store = configureStore({
  reducer: {
    cesta: cestaReducer,
    buscar: buscarReducer,
  },
});

export default store;
