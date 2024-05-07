import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Componentes
import Dashboard from "./components/Dashboard";
// Pages
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import Maquinaria from "./pages/Maquinaria.jsx";
import Almacen from "./pages/Almacen.jsx";
import Contratos from "./pages/Contratos.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
export const MaquinaContext = React.createContext();

function App() {
  const [maquinaSeleccionada, setMaquinaSeleccionada] = useState(null);
  return (
    <MaquinaContext.Provider
      value={[maquinaSeleccionada, setMaquinaSeleccionada]}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route element={<Dashboard />} path="/inicio/*">
          <Route path="" element={<DashboardPage />} />
            <Route path="contratos" element={<Contratos />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="maquinaria" element={<Maquinaria />} />
            <Route path="almacen" element={<Almacen />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </MaquinaContext.Provider>
  );
}

export default App;
