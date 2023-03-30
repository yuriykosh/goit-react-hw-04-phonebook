export const ContactsList = ({contacts, handleDelete}) => {
    return <ul>{contacts.map(contact => <li key={contact.id}> <p>{contact.name}</p> <p>{contact.number}</p> <button type='button' onClick={() => handleDelete(contact.id)}>delete</button> </li>)}</ul>
}