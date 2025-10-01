import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./App.css";

function ChatPage({ contacts }) {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const activeContact = contacts.find((c) => c.id === contactId);

  // 🔹 Estado para buscador
  const [searchTerm, setSearchTerm] = useState("");

  // Función para obtener hora en formato HH:MM
  const getTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const [messages, setMessages] = useState({
    saramalacara: [
      { type: "incoming", text: "Holaa te invito a mi casa aca en Mataderos", time: getTime() },
      { type: "incoming", text: "tengo algo para contarte...", time: getTime() },
      { type: "outgoing", text: "Okaa, ahi salgo para allá", time: getTime() },
      { type: "incoming", text: "Trae chupetines!!!", time: getTime() },
    ],
    kurt: [
      { type: "incoming", text: "Hola broo tanto tiempo, me ayudas a terminar una canción?", time: getTime() },
      { type: "outgoing", text: "Bancame un cacho, ahora no puedo contestar.", time: getTime() },
    ],
    cartman: [{ type: "incoming", text: "Ay, dios mío mataron a Kenny!", time: getTime() }],
    saul: [
      { type: "incoming", text: "Oye, perdona viejo, pero eres indefendible ante la justicia", time: getTime() },
      { type: "incoming", text: "Vas a ir preso xD", time: getTime() },
      { type: "outgoing", text: "Por que!!?? Me dijiste que este caso era muy facil", time: getTime() },
      { type: "incoming", text: "Lo sé XD, bueno me debes 700 dolares. Abonas en efectivo o transferencia?", time: getTime() },
    ],
    faker: [{ type: "incoming", text: "Vamos a jugar una partida", time: getTime() }],
  });

  const [inputText, setInputText] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Detectar si es mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Enviar mensaje con hora
  const sendMessage = () => {
    if (inputText.trim() === "") return;
    setMessages({
      ...messages,
      [contactId]: [
        ...(messages[contactId] || []),
        { type: "outgoing", text: inputText, time: getTime() },
      ],
    });
    setInputText("");
  };

  // 🔹 Filtrar contactos según buscador
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      {/* Sidebar */}
      <div className={`sidebar ${isMobile && activeContact ? "hide-mobile" : ""}`}>
        <h2 className="title-chat">Chats</h2>

        {/* 🔍 Buscador */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar contacto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

        <div className="sidebar-footer">
          <button title="Mi Perfil"><i className="fa-solid fa-circle-user"></i></button>
          <Link to="/new-contact">
            <button title="Nuevo Contacto"><i className="fa-solid fa-user-plus"></i></button>
          </Link>
          <button title="Estados"><i className="fa-solid fa-circle-notch"></i></button>
          <button title="Configuración"><i className="fa-solid fa-gear"></i></button>
          <button title="Llamadas"><i className="fa-solid fa-phone"></i></button>
        </div>
      </div>

      {/* Chat */}
      {activeContact && (
        <div className={`chat ${isMobile ? "active" : ""}`}>
          <div className="chat-header">
            {isMobile && (
              <span className="back-btn" onClick={() => navigate("/")}>
                <i className="fa-solid fa-chevron-left"></i>
              </span>
            )}
            <img
              src={activeContact.img || "https://via.placeholder.com/50"}
              alt={activeContact.name}
              className="profile-pic"
            />
            <h3>{activeContact.name}</h3>
            <span className="config-btn">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </span>
          </div>

          <div className="messages">
            {messages[contactId]?.map((msg, index) => (
              <p key={index} className={`msg ${msg.type}`} data-time={msg.time || ""}>
                {msg.text}
              </p>
            ))}
          </div>

          <div className="input-bar">
            <input
              type="text"
              placeholder="Escribí un mensaje..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatPage;