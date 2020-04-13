// import React from 'react';
import React, {Component} from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContacts from './CreateContacts';
import { Route } from 'react-router-dom';

class App extends Component {
  state = {
   contacts :  [],

  }

  componentDidMount()  {
    ContactsAPI.getAll()
      .then((contacts) => { this.setState(() => ({ contacts }) )})
  }

  deleteContact = (contact) => { 
     this.setState((currentState) => ({
       contacts : currentState.contacts.filter( (itrContact) =>  itrContact.id !== contact.id )
     }) )
     ContactsAPI.remove(contact);
  };

  render() {
    return (
      <div>
          <Route exact path='/' render={() => (<ListContacts contacts={this.state.contacts} deleteContact={this.deleteContact}/>)} />
        <Route path='/create' component={CreateContacts} />
      </div>
    )
  }
}

export default App;
