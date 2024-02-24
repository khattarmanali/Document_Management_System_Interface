import logo from "./logo.svg";
import "./App.css";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
