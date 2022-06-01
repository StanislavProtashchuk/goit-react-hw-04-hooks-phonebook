import PropTypes from 'prop-types';
import s from './ContactList.module.css'

const ContactList = ({ filteredContacts, deleteContact }) => {
    return (
        <ul >
        {filteredContacts.map(({ name, number, id }) => {
            return (
                <li className={s.list} key={id}>
                    {name}: {number}
                    <button className={s.button} type='button' id={id} onClick={() => deleteContact(id)}>Delete</button>
                </li>
        )})}
        </ul>
    )
};

ContactList.propTypes = {
    filteredContacts: PropTypes.array.isRequired,
    deleteContact: PropTypes.func.isRequired
}

export default ContactList;