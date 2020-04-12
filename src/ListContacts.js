import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ListContacts extends Component {

    static propTypes = {
        contacts : PropTypes.array.isRequired,
        deleteContact : PropTypes.func.isRequired
        
    }

    state = {
        query : ''
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query : query.trim()
        }))
    }
clearQuery = () => {
    this.updateQuery('')
}

    render() {
        const { contacts , deleteContact, onNavigate } = this.props
        const query = this.state.query

        const filterContacts = this.state.query === '' ? contacts : contacts.filter( (c) => (c.name.toLowerCase().includes(query.toLowerCase())))

    return (

        <div className='list-contacts'>
            <div className='list-contacts-top'>
                <input className='search-contacts' type='text' placeholder='Search Contacts' value={query} onChange={(event) => this.updateQuery(event.target.value)} />
                <a href="#create" className="add-contact" onClick={onNavigate}>Add Contact</a>
            </div>
            <div>
                {filterContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                       <span>
                           Now Showing {filterContacts.length} of {contacts.length}
                           <button onClick={this.clearQuery}>Show All</button>
                        </span> 
                    </div>
                )}
            </div>
            <ol className='contact-list'>
             {filterContacts.map((contact) => (
                 <li key={contact.id} className='contact-list-item'>
                 <div 
                     className='contact-avatar'
                     style={{
                         backgroundImage: `url(${contact.avatarURL})`
                     }}
                 ></div>
                 <div className='contact-details'>
                    <p>{contact.name}</p>
                    <p>{contact.handle}</p>
                 </div>
                 <button onClick={() => {deleteContact(contact)}} className='contact-remove'>
                     Remove
                </button>
             </li>
             ))}
         </ol>

        </div>
         
     )   
    }

}

export default ListContacts









