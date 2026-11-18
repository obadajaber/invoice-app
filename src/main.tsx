import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App";
import { InvoiceProvider } from "./context/InvoiceContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
     <InvoiceProvider>
      <App />
      </InvoiceProvider>
    </BrowserRouter>
  </StrictMode>,
);
