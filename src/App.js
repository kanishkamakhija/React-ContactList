// import React from 'react';
import React, {Component} from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContacts from './CreateContacts';

class App extends Component {
  state = {
   contacts :  [],
   screen : 'list',

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
        {this.state.screen === 'list' && (<ListContacts contacts={this.state.contacts} 
                                                        deleteContact={this.deleteContact }  
                                                        onNavigate={() => { this.setState( () => ({screen: 'create'}) )} } /> )}
        {this.state.screen === 'create' && (<CreateContacts />)}
      </div>
    )
  }
}

export default App;
