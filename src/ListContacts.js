import React, { Component } from "react";
import PropsTypes from 'prop-types'
import { Link } from "react-router-dom";

class ListContacts extends Component {


    static propsTypes = {
                            contacts: PropsTypes.array.isRequired,
                            deleteContacts: PropsTypes.func.isRequired,
                        }
    state = {query:''}
    
    updateQuery = (query) =>{
        this.setState(() => ({
            query:query.trim()
        }))
    }
    clearQuery = (query) => {
        this.updateQuery(query);
    }
        
    render() {
        const {query} = this.state;
        const { contacts, deleteContacts } = this.props
                
        const showingContacts = query === ' ' ? contacts : contacts.filter((c) => {
            return c.name.toLowerCase().includes(query.toLowerCase());
        })

        

        return (
            <div className='list-contacts'>
            <div className='list-contacts-top'>                   
                    <input
                    className='search-contacts'
                    type='text'
                    value={query}
                    onChange={(event)=>this.updateQuery(event.target.value)}/>   
                    <Link
                    className='add-contact'
                     to='/create'>
                Add To Contact
                </Link>                  
                </div>
               
                
                {showingContacts.length !== contacts.length &&
                    (<div className='showing-contacts '>
                    <span>{`Showing ${showingContacts.length} of ${contacts.length}`}</span>
                    <button onClick={()=> this.clearQuery('')} > Show All</button>
                    </div>)}
                 
                <ol className="contact-list">
                    {showingContacts.map((contact) => (                        
                        <li key={contact.id} className='contact-list-item'>
                            <div
                                className='contact-avatar'
                                style={{ backgroundImage:`url(${contact.avatarURL})`

                                }}>  </div>
                            

                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.handle}</p>
                            </div>
                            <button className='contact-remove'  onClick={()=>deleteContacts(contact)}>Remove</button> 
                        </li>
                        ))}
                </ol>
            </div>
          
        )
}



}

export default  ListContacts;