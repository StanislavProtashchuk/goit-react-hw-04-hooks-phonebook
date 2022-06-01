import { useState } from "react";
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

export default function ContactForm({ onSubmit }) {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    
    function handleChange(e) {
        const { name, value } = e.target;
        
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            
            default:
                return
        }
    };
    
    function handleSubmit (e){
        e.preventDefault();

        onSubmit({ name, number });
        reset();
    };
    
    function reset () {
        setName('');
        setNumber('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label className={s.label}>Name
                <input               
                    className={s.input}
                    placeholder={name}
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    />
                </label>
                <label className={s.label}>Number
                    <input
                    className={s.input}
                    type="tel"
                    name="number"
                    value={number}
                    onChange={handleChange}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    />
                </label>
                <button
                    className={s.button}
                    type="submit">Add contact</button>
            </form>
        )
    }

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}