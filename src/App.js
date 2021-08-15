import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'

import ContactForm from './components/contactForm/ContactForm'
import ContactList from './components/contactList/ContactList'
import Filter from './components/filter/Filter'

import { saveContacts, readContacts } from './utils/localStorage.helpers'


const App = () => {
  const [state, setState] = useState({
    contacts: [],
    filter: ''
  })

  const setContacts = (contacts) => {
    setState({
      contacts
    });
    saveContacts(contacts)
  }

  const createContact = ({ name, number }) => {
    const contact = {
      id: uuidv4(),
      name,
      number
    }

    const foundContact = state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    
    if (foundContact) {
      alert(`${name} is already in contacts`);
      return
    }
    
    setContacts([
      ...state.contacts,
      contact
    ]);
  }

  const onFilterChange = ({ target }) => {
    setState({
      ...state,
      filter: target.value
    });
  }

  const deleteContact = ({ target }) => {
    const id = target.id.split(':')[1];

    setContacts(
      state.contacts.filter(
        contact => contact.id !== id
      ),
    );
  }

  useEffect(() => {
    const contacts = readContacts();
    setState({
      ...state,
      contacts
    })
  }, [])
  
  const filteredContacts = state.contacts.filter(
    contact => contact.name.toLowerCase().includes(state.filter.toLowerCase())
  );   
  
  return (
    <div className="wrapper">
      <h2 className="lessonHeader">Phonebook</h2>
      <ContactForm
        createContact={createContact}
      />
      <h2 className="lessonHeader">Contacts</h2>
      <Filter handleChange={onFilterChange} filter={state.filter}/>
      <ContactList contacts={filteredContacts} handleDelete={ deleteContact }/>
    </div>
  );
}

export default App;