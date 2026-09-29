import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Render the root application component inside the DOM element
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);