import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/user/Navbar";
import ThemeProvider from "./components/context/ThemeProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <Navbar />
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
