import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx"; // Importe o .tsx
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx"; // Importe o .tsx

// O TypeScript vai reclamar do 'getElementById("root")'
// Adicionamos '!' para afirmar que 'root' nunca será nulo.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);