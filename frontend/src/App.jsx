import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  const handleNavigate = (page) => {
    alert(`Você clicou para navegar para: ${page}`);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home onNavigate={handleNavigate} />} />
      </Routes>
    </BrowserRouter>
  );
}
