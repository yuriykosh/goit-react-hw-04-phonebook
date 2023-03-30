import { useState, useEffect } from 'react';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactList/ContactList';
import { Filter } from './Filter';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import PropTypes from 'prop-types';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contactsStorage = localStorage.getItem('contacts');
    const parsedContactsStorage = JSON.parse(contactsStorage);
    return parsedContactsStorage || [];
  });
  const [filter, setFilter] = useState ("");
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  const updateContacts = ({ name, number }) => {
    const contactExists = contacts.find(contact => {
      return contact.name === name || contact.number === number;
    });

    contactExists
      ? Report.info(
          '',
          `Contact with name ${name} and number ${number} already exists`,
          'Okay'
        )
      : setContacts(prevState => 
           [
            ...prevState,
            {
              name,
              number,
              id: nanoid(),
            },
          ],
        );
  };

  const filterContacts = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContacts = id => {
    setContacts(prevState => 
      prevState.filter(contact => contact.id !== id),
    );
  };

    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return (
      <>
        <Section title="Phonebook">
          <ContactForm onSubmit={updateContacts} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} filter={filterContacts} />
          <ContactsList
            contactList={filteredContacts}
            deleteContact={deleteContacts}
          />
        </Section>
      </>
    );
  }

App.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  id: PropTypes.string,
};
