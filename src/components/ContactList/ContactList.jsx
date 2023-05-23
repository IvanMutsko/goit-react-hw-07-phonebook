import { List, ListItem } from './ContactList.styled';
import { useSelector } from 'react-redux';
import { getFilter } from '../../redux/selectors';
import { useGetContactsQuery } from 'redux/contactsSlice';
import { ContactItem } from './ContactItem';

const ContactList = () => {
  const filter = useSelector(getFilter);
  const { data: contacts, isLoading } = useGetContactsQuery();

  const filteringContactsList = () => {
    const filteredContacts =
      contacts?.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      ) ?? [];

    return filteredContacts;
  };

  let filteredContactsData = filteringContactsList();

  if (isLoading) return <p>Loading...</p>;

  return filteredContactsData.length === 0 ? (
    <p>Sorry, but you don't have any contacts yet. Add your first contact.</p>
  ) : (
    <List>
      {!isLoading &&
        filteredContactsData.map(({ id, name, phone }) => {
          return (
            <ListItem key={id}>
              <ContactItem name={name} phone={phone} id={id} />
            </ListItem>
          );
        })}
    </List>
  );
};

export default ContactList;
