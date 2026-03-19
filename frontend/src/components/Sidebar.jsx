// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Panel</h2>
      <ul>
        <li><Link to="/percepciones">Percepciones</Link></li>
        <li><Link to="/deducciones">Deducciones</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;