
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import defaultAvatar from "./images/user.jpg";

function NewContact({ addContact }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      alert("El nombre y el teléfono son obligatorios.");
      return;
    }

    // Crear id único (ej: nombre + timestamp)
    const id = `${name.toLowerCase()}-${Date.now()}`;

    const newContact = {
      id,
      name: lastName ? `${name} ${lastName}` : name, 
      phone,
      img: defaultAvatar // imagen predeterminada
    };

    addContact(newContact); // lo agrega a App.jsx
    navigate("/"); // redirige a la lista de contactos
  };

  return (
    <div className="new-contact-form">
      <h2>Agregar Nuevo Contacto</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre*:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Apellido:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <label>
          Teléfono*:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>

        <button type="submit">Guardar</button>
        <button type="button" onClick={() => navigate("/")}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default NewContact;