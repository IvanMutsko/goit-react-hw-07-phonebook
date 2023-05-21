import { Formik } from 'formik';
import * as yup from 'yup';
import {
  FormElement,
  FieldElement,
  FieldTitle,
  ErrorMessageElement,
  AddBtn,
} from './ContactForm.styled';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { formatterNumber } from '../../utils/formatterNumber';
import { addContact } from '../../redux/contactsSlice';
import { getContacts } from '../../redux/selectors';

const schema = yup.object().shape({
  name: yup.string().min(2, 'Too Short!').max(70, 'Too Long!').required(),
  number: yup
    .string()
    .matches(/^[0-9]{7}$/, 'Must be exactly 7 digits')
    .required(),
});

const initialValues = { name: '', number: '' };

const ContactForm = () => {
  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();

  const onSubmitForm = (values, { resetForm }) => {
    const isContainName = contacts.some(
      contactName =>
        contactName.name.toLocaleLowerCase() === values.name.toLocaleLowerCase()
    );

    if (isContainName) {
      alert(`${values.name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: values.name,
      number: formatterNumber(values.number),
    };

    dispatch(addContact(newContact));

    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmitForm}
    >
      <FormElement autoComplete="off">
        <FieldTitle htmlFor="name-input">Name</FieldTitle>
        <FieldElement id="name-input" type="text" name="name" />
        <ErrorMessageElement name="name" component="div" />
        <FieldTitle htmlFor="number-input">Number</FieldTitle>
        <FieldElement id="number-input" type="tel" name="number" />
        <ErrorMessageElement name="number" component="div" />
        <AddBtn type="submit">Add contact</AddBtn>
      </FormElement>
    </Formik>
  );
};

export default ContactForm;
