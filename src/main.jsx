import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { EmployeeProvider } from "./context/EmployeeContext";
import "./assets/styles/global.css";
import "./assets/styles/components.css";
import "./assets/styles/login.css";
import "./assets/styles/dashboard.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <EmployeeProvider>
        <App />
      </EmployeeProvider>
    </AuthProvider>
  </React.StrictMode>
);
