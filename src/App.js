import "./App.css";
import UserLayout from "./layouts/UserLayout";
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
