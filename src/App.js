import React, { useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UserProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </UserProvider>
      </header>
    </div>
  );
}

export default App;
