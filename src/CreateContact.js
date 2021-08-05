import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImageInput from './ImageInput';
import serializeForm from 'form-serialize';

class CreateContact extends Component {

    handleSubmit = (e) => {
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true });
        if (this.props.onCreateContact(values)) {
            this.props.onCreateContact(values)
            console.log(values);
        }
    }

    render() {
        return (
            <div >
                <Link to='/' className='close-create-contact' >
                </Link>
             
                <form className='create-contact-form' onSubmit={this.handleSubmit}>
                    <ImageInput name ='avatarURL' className='create-contact-avatar-input' maxHieght={64} />

                    <div className='create-contact-details '>

                    <input name='name' type='text' />
                    <input name='handle' type='text' />
                    <button> Add Contact</button>

                    </div>
                    
                </form>
                
            </div>
        )
    }
}

export default CreateContact;