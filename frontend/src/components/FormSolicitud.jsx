import { useState } from 'react';
import axios from 'axios';

function FormSolicitud() {
  const [tipo, setTipo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const enviar = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/solicitudes', { tipo, mensaje });
      alert('Solicitud enviada correctamente');
      setTipo('');
      setMensaje('');
    } catch (error) {
      alert('Error al enviar solicitud');
    }
  };

  return (
    <form onSubmit={enviar}>
      <label>Tipo de ayuda:</label><br />
      <select value={tipo} onChange={e => setTipo(e.target.value)} required>
        <option value="">Seleccione tipo</option>
        <option value="Académica">Académica</option>
        <option value="Administrativa">Administrativa</option>
      </select><br /><br />

      <label>Mensaje:</label><br />
      <textarea value={mensaje} onChange={e => setMensaje(e.target.value)} required /><br /><br />

      <button type="submit">Enviar</button>
    </form>
  );
}

export default FormSolicitud;
