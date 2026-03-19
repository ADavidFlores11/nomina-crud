import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

function DeduccionesPage() {
  const [deducciones, setDeducciones] = useState([]);
  const [mode, setMode] = useState("consultar"); // consultar | crear | actualizar | eliminar

  // Estados para formulario de creación
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get('http://localhost:3000/deducciones');
    setDeducciones(res.data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/deducciones', { codigo, nombre, descripcion });
    setCodigo('');
    setNombre('');
    setDescripcion('');
    fetchData();
    setMode("consultar"); // volver a tabla después de guardar
  };

  const handleUpdate = async (codigo, nuevoNombre, nuevaDescripcion) => {
    await axios.put(`http://localhost:3000/deducciones/${codigo}`, {
      nombre: nuevoNombre,
      descripcion: nuevaDescripcion
    });
    fetchData();
  };

  const handleDelete = async (codigo) => {
    await axios.delete(`http://localhost:3000/deducciones/${codigo}`);
    fetchData();
  };

  return (
    <div>
      <h1>Deducciones</h1>

      {/* 🔹 Botones CRUD arriba */}
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
  <Button variant="contained" color="primary" onClick={() => setMode("consultar")}>Consultar</Button>
  <Button variant="contained" color="success" onClick={() => setMode("crear")}>+ Crear</Button>
  <Button variant="outlined" onClick={() => setMode("actualizar")}>Actualizar</Button>
  <Button variant="outlined" color="error" onClick={() => setMode("eliminar")}>Eliminar</Button>
</div>

      {/* 🔹 Consultar */}
      {mode === "consultar" && (
        <table>
          <thead>
            <tr>
              <th>CODIGO</th>
              <th>NOMBRE</th>
              <th>DESCRIPCIÓN</th>
            </tr>
          </thead>
          <tbody>
            {deducciones.map((d, index) => (
              <tr key={index}>
                <td>{d[0]}</td>
                <td>{d[1]}</td>
                <td>{d[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 🔹 Crear */}
      {mode === "crear" && (
        <form onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Código"
            value={codigo}
            onChange={e => setCodigo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
          />
          <button type="submit">Guardar</button>
        </form>
      )}

      {/* 🔹 Actualizar */}
      {mode === "actualizar" && (
        <table>
          <thead>
            <tr>
              <th>CODIGO</th>
              <th>NOMBRE</th>
              <th>DESCRIPCIÓN</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {deducciones.map((d, index) => (
              <tr key={index}>
                <td>{d[0]}</td>
                <td>
                  <input defaultValue={d[1]} onBlur={(e) => handleUpdate(d[0], e.target.value, d[2])} />
                </td>
                <td>
                  <input defaultValue={d[2]} onBlur={(e) => handleUpdate(d[0], d[1], e.target.value)} />
                </td>
                <td><button onClick={() => handleUpdate(d[0], d[1], d[2])}>Guardar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 🔹 Eliminar */}
      {mode === "eliminar" && (
        <table>
          <thead>
            <tr>
              <th>CODIGO</th>
              <th>NOMBRE</th>
              <th>DESCRIPCIÓN</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {deducciones.map((d, index) => (
              <tr key={index}>
                <td>{d[0]}</td>
                <td>{d[1]}</td>
                <td>{d[2]}</td>
                <td><button onClick={() => handleDelete(d[0])}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DeduccionesPage;