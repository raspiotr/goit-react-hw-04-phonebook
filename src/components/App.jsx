import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    try {
      const storedContacts = localStorage.getItem('contacts');
      if (storedContacts) {
        return JSON.parse(storedContacts);
      } else {
        return [];
      }
    } catch (error) {
      alert(error);
    }
  });

  const [filter, setFilter] = useState('');

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const handleAddContact = contact => {
    if (
      contacts.find(
        ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      alert(`${contact.name} is already in contacts :)`);
      return;
    }

    const id = nanoid();
    setContacts(prevContacts => [...prevContacts, { id, ...contact }]);
  };

  const handleDelete = event => {
    event.preventDefault();
    const idToDelete = event.target.id;
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== idToDelete)
    );
  };

  useEffect(() => {
    try {
      localStorage.setItem('contacts', JSON.stringify(contacts));
      const contactsFromStorage = JSON.parse(localStorage.getItem('contacts'));
      if (contactsFromStorage.length === 0) {
        localStorage.removeItem('contacts');
      }
    } catch (error) {
      alert(error);
    }
  }, [contacts]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmitHandle={handleAddContact} />
      <h2>Contacts</h2>
      <Filter onChangeHandle={handleFilterChange} />
      <ContactList
        contacts={contacts}
        filter={filter}
        onDeleteHandle={handleDelete}
      />
    </div>
  );
};
