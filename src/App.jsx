import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import EmptyPage from "./EmptyPage";
import ChatPage from "./ChatPage";
import NewContact from "./NewContact";
import saramalacara from './images/sara.jpg';
import kurt from './images/kurt.jpg';
import cartman from './images/cartman.jpg';
import saul from './images/saul.jpg';
import faker from './images/faker.jpg';

function App() {
  const [contacts, setContacts] = useState([
    { id: 'saramalacara', name: 'Saramalacara', img: saramalacara },
    { id: 'kurt', name: 'Kurt Cobain', img: kurt },
    { id: 'cartman', name: 'Cartman', img: cartman },
    { id: 'saul', name: 'Saul Goodman', img: saul },
    { id: 'faker', name: 'Faker', img: faker },
  ]);

  const addContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  return (
    <Routes>
      <Route path="/" element={<EmptyPage contacts={contacts} />} />
      <Route path="/chat/:contactId" element={<ChatPage contacts={contacts} />} />
      <Route path="/new-contact" element={<NewContact addContact={addContact} />} />
    </Routes>
  );
}

export default App;
