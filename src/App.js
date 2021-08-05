import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsApi from './utils/ContactsAPI'
import { Route } from 'react-router';
import CreateContact from './CreateContact';



class App extends Component {
  state = {
    contacts: []
  }
  componentDidMount() {
    ContactsApi.getAll().then((contacts) => {
      this.setState(() => ({
        contacts
      }))
    })
  }
  removeContact = (contact) => {
    this.setState((currentState) => ({      
      contacts: currentState.contacts.filter((c) => {        
        return c.id !== contact.id
      })
    }));
    ContactsApi.remove(contact);
  }
  CreateContact = (contact) => {
    ContactsApi.create(contact).then((contact) => (
      this.setState((currentState) => ({
        contacts: currentState.contacts.concat(contact)
      }))
    ))
  }
  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <ListContacts contacts={this.state.contacts} deleteContacts={this.removeContact} />)}>
          
        </Route>

         {/* History causes the page to redirect  */}
        <Route path='/create' render={({history}) => (<CreateContact onCreateContact={(contact) => {
          this.CreateContact(contact)
          history.push('/')
         }}/>)}>
          
        </Route>
      </div>
    );
  }
}

export default App;
