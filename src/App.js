import React, { useContext, useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { UserContext, UserProvider } from "./contexts/UserContext";
import { AlertProvider, AppSnackBar } from "./contexts/AlertProvider";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AlertProvider>
          <UserProvider>
            <BrowserRouter>
              <AppRoutes />
              <AppSnackBar />
            </BrowserRouter>
          </UserProvider>
        </AlertProvider>
      </header>
    </div>
  );
}

export default App;
