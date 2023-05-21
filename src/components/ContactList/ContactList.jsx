import { List, ListItem } from './ContactList.styled';
import { useSelector } from 'react-redux';
import { getFilter } from '../../redux/selectors';
import { useGetContactsQuery } from 'redux/contactsSlice';
import { ContactItem } from './ContactItem';

const ContactList = () => {
  const filter = useSelector(getFilter);
  const { data, isLoading, isSuccess } = useGetContactsQuery();

  const filteringContactsList = () => {
    if (isSuccess) {
      const filteredContacts = data.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
      return filteredContacts;
    }
  };

  console.log(filteringContactsList());

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : data.length === 0 ? (
        <p>
          Sorry, but you don't have any contacts yet. Add your first contact.
        </p>
      ) : (
        <List>
          {data.map(({ id, name, phone }) => {
            return (
              <ListItem key={id}>
                <ContactItem name={name} phone={phone} id={id} />
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
};

export default ContactList;

// ДОРОБИТИ ФІЛЬТРАЦІЮ
