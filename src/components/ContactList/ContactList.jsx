import { List, ListItem, Text, Delete } from './ContactList.styled';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import { getFilter, getContacts } from '../../redux/selectors';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const filteredContactsList = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      {contacts.length === 0 ? (
        <p>
          Sorry, but you don't have any contacts yet. Add your first contact.
        </p>
      ) : (
        <List>
          {filteredContactsList.map(({ id, name, number }) => {
            return (
              <ListItem key={id}>
                <Text>
                  {name}: {number}
                </Text>
                <Delete
                  type="button"
                  onClick={() => dispatch(deleteContact(id))}
                >
                  Delete
                </Delete>
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
};

export default ContactList;
