
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Remover forçar dark mode - deixar o sistema decidir
// Comentando a linha que força dark mode
// if (typeof document !== "undefined" && !document.body.classList.contains("dark")) {
//   document.body.classList.add("dark");
// }

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
