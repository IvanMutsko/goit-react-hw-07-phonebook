import { List, ListItem } from './ContactList.styled';
import { useSelector } from 'react-redux';
import { getFilter } from '../../redux/selectors';
import { useGetContactsQuery } from 'redux/contactsSlice';
import { ContactItem } from './ContactItem';
import { sortArrOfObj } from 'utils/sortArrOfObj';

const ContactList = () => {
  const filter = useSelector(getFilter);
  const { data: contacts, isLoading } = useGetContactsQuery();

  const filteringContactsList = () => {
    if (!contacts) return [];
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  };

  const filteredContactsData = filteringContactsList();
  const sortedContactsData = sortArrOfObj(filteredContactsData);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (sortedContactsData.length === 0) {
    return (
      <p>Sorry, but you don't have any contacts yet. Add your first contact.</p>
    );
  }

  return (
    <List>
      {sortedContactsData.map(({ id, name, phone }) => (
        <ListItem key={id}>
          <ContactItem name={name} phone={phone} id={id} />
        </ListItem>
      ))}
    </List>
  );
};

export default ContactList;
