import React, { useState, useEffect } from 'react';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { FilterByName } from './Filter/Filter';
import { Appstyle } from './App.styled';

export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filteredQuery, setfilteredQuery] = useState('');

  useEffect(() => {
    const contactsFromLocalStorage = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsFromLocalStorage);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const changeFilter = e => {
    setfilteredQuery(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    if (filteredQuery) {
      const normalizedFilter = filteredQuery.toLowerCase();
      return contacts.filter(contact => {
        return contact.name.toLowerCase().includes(normalizedFilter);
      });
    }

    return contacts;
  };

  const forSubmitHandler = data => {
    const { name, number } = data;
    const id = nanoid();
    const addedContacts = [];

    contacts.filter(contact => {
      const heveContact =
        contact.name.toLowerCase() === data.name.toLowerCase();
      return heveContact && addedContacts.push(contact);
    });
    if (addedContacts.length === 0) {
      setContacts(pS => [...pS, { id, name, number }]);
    } else {
      return alert(`${name} is already in contacts`);
    }
  };

  const deleteContact = id => {
    setContacts(() => contacts.filter(contact => contact.id !== id));
  };

  return (
    <Appstyle>
      <h1>PhoneBook</h1>
      <ContactForm onSubmit={forSubmitHandler} />
      <h2>Contacts</h2>
      <FilterByName value={filteredQuery} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
    </Appstyle>
  );
}
