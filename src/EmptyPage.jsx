import { Link } from "react-router-dom";
import { useState } from "react";
import "./App.css";

function EmptyPage({ contacts }) {
  const [search, setSearch] = useState("");

  // Filtrar contactos según el texto buscado
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="title-chat">Chats</h2>

        {/* Barra de búsqueda */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar contacto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ul className="contacts-list">
          {filteredContacts.map((contact) => (
            <li key={contact.id}>
              <Link
                to={`/chat/${contact.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={contact.img || "https://via.placeholder.com/50"}
                  alt={contact.name}
                  className="profile-pic"
                />
                <span>{contact.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Botones redondos */}
        <div className="sidebar-footer">
          <Link to="/new-contact">
            <button title="Nuevo Contacto">
              <i className="fa-solid fa-user-plus"></i>
            </button>
          </Link>
          <button title="Estados"><i className="fa-regular fa-circle"></i></button>
          <button title="Configuración"><i className="fa-solid fa-gear"></i></button>
          <button title="Llamadas"><i className="fa-solid fa-phone"></i></button>
        </div>
      </div>

      {/* Panel derecho vacío */}
      <div className="chat empty-chat">
        <div className="empty-content">
          <i
            className="fa-brands fa-whatsapp"
            style={{ fontSize: "80px", color: "#25D366" }}
          ></i>
          <h2>WhatsApp Web</h2>
          <p>Selecciona un chat para comenzar a conversar</p>
        </div>
      </div>
    </div>
  );
}

export default EmptyPage;
