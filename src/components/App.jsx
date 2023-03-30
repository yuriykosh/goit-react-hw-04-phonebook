import { Component } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactsList } from "./ContactsList/ContactsList";

export class App extends Component  {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  }

  componentDidMount() {

    const contactsStorage = localStorage.getItem('contacts');

    const parsedContactsStorage = JSON.parse(contactsStorage);



    if (parsedContactsStorage) {

      this.setState({ contacts: parsedContactsStorage })

    }
  }


    componentDidUpdate(prevProps, prevState) {

      if (this.state.contacts !== prevState.contacts) {

        localStorage.setItem('contacts', JSON.stringify(this.state.contacts))

      }

    }
  
  handleSubmit = (contact) => {
    const isExist = this.state.contacts.find(item => item.name === contact.name)
    if (isExist) {
      alert('This name is already in contacts')
      return
    }
    this.setState(prevState => ({contacts:[...prevState.contacts, contact]}))
  }

  deleteContact = (id) => {
    this.setState(prevState => ({contacts:prevState.contacts.filter(contact => contact.id !== id)}))
  }

  handleFilterChange = (event) => {
    this.setState({filter:event.target.value})
  }

  getFilteredContacts = () => {
    return this.state.contacts.filter(contact => contact.name.toLocaleLowerCase().includes(this.state.filter.toLocaleLowerCase()))
  }

  
  

  render() {
    const contacts = this.getFilteredContacts();

     return (
    <>
         <ContactForm onSubmit={this.handleSubmit} />
         <h2>contacts</h2>
         <Filter handleInputChange={this.handleFilterChange} />
         <ContactsList contacts={contacts} handleDelete={ this.deleteContact } />
    </>
  );
  }
};
