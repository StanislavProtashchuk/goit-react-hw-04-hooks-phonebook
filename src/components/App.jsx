import { Component } from "react";
import { nanoid } from "nanoid";
import ContactForm from "./ContactForm";
import Filter from './Filter';
import ContactList from './ContactList';

export class App extends Component {
  state = {
    contacts: [],
    filter: ''
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
}
  }

  formSubmitHandler = ({name, number}) => {
    const { contacts } = this.state;
    
    if (contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      return alert(`${name} is already in contacts`)
    };

    const contact = {
      name,
      number,
      id: nanoid()
    };

    this.setState(prevState => ({ contacts: [...prevState.contacts, contact],}));
  };

  handleFilter = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  };

  deleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }));
  };

  render() {
    const { filter } = this.state;

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilter} />
        <ContactList filteredContacts={this.filteredContacts()} deleteContact={this.deleteContact} />
      </div>
    );
  }
}