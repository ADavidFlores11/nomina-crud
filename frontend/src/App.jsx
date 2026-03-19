import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PercepcionesPage from "./pages/percepciones/PercepcionesPage";
import DeduccionesPage from "./pages/deducciones/DeduccionesPage";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/percepciones" element={<PercepcionesPage />} />
            <Route path="/deducciones" element={<DeduccionesPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;