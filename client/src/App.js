import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CrudPage from "./pages/crud";
import "@fontsource/inter";
import { CssVarsProvider, extendTheme } from "@mui/joy";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";

function App() {
  return (
    <BrowserRouter>
      <CssVarsProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/members" element={<CrudPage />} />
          <Route path="/more" element={<AboutPage />} />
        </Routes>
      </CssVarsProvider>
    </BrowserRouter>
  );
}

export default App;
