import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from '@mui/material';
import { Button } from '@mui/material';

function PercepcionesPage() {
  const [percepciones, setPercepciones] = useState([]);
  const [mode, setMode] = useState("consultar");

  // Estados para formulario de creación
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get('http://localhost:3000/percepciones');
    setPercepciones(res.data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/percepciones', { codigo, nombre, descripcion });
    setCodigo('');
    setNombre('');
    setDescripcion('');
    fetchData();
    setMode("consultar");
  };

  const handleUpdate = async (codigo, nuevoNombre, nuevaDescripcion) => {
    await axios.put(`http://localhost:3000/percepciones/${codigo}`, {
      nombre: nuevoNombre,
      descripcion: nuevaDescripcion
    });
    fetchData();
  };

  const handleDelete = async (codigo) => {
    await axios.delete(`http://localhost:3000/percepciones/${codigo}`);
    fetchData();
  };

  return (
    <div>
      <h1>Percepciones</h1>

      {/* 🔹 Botones CRUD */}
      
<div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
  <Button variant="contained" color="primary" onClick={() => setMode("consultar")}>Consultar</Button>
  <Button variant="contained" color="success" onClick={() => setMode("crear")}>+ Crear</Button>
  <Button variant="outlined" onClick={() => setMode("actualizar")}>Actualizar</Button>
  <Button variant="outlined" color="error" onClick={() => setMode("eliminar")}>Eliminar</Button>
</div>

      {/* 🔹 Consultar */}
  {mode === "consultar" && (
  <TableContainer component={Paper} elevation={3}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell><strong>CODIGO</strong></TableCell>
          <TableCell><strong>NOMBRE</strong></TableCell>
          <TableCell><strong>DESCRIPCIÓN</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {percepciones.map((p, index) => (
          <TableRow key={index}>
            <TableCell>{p[0]}</TableCell>
            <TableCell>{p[1]}</TableCell>
            <TableCell>{p[2]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
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
            {percepciones.map((p, index) => (
              <tr key={index}>
                <td>{p[0]}</td>
                <td>
                  <input defaultValue={p[1]} onBlur={(e) => handleUpdate(p[0], e.target.value, p[2])} />
                </td>
                <td>
                  <input defaultValue={p[2]} onBlur={(e) => handleUpdate(p[0], p[1], e.target.value)} />
                </td>
                <td><button onClick={() => handleUpdate(p[0], p[1], p[2])}>Guardar</button></td>
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
            {percepciones.map((p, index) => (
              <tr key={index}>
                <td>{p[0]}</td>
                <td>{p[1]}</td>
                <td>{p[2]}</td>
                <td><button onClick={() => handleDelete(p[0])}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PercepcionesPage;