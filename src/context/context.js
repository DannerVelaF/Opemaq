import React from "react";

const AppContext = React.createContext({
  maquinariaSeleccionada: null,
  setMaquinariaSeleccionada: () => {},
});

export default AppContext;
