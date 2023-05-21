import { Formik } from 'formik';
import * as yup from 'yup';
import {
  FormElement,
  FieldElement,
  FieldTitle,
  ErrorMessageElement,
  AddBtn,
} from './ContactForm.styled';
import { formatterNumber } from '../../utils/formatterNumber';
import { useAddContactMutation } from '../../redux/contactsSlice';
import { useGetContactsQuery } from 'redux/contactsSlice';

const schema = yup.object().shape({
  name: yup.string().min(2, 'Too Short!').max(70, 'Too Long!').required(),
  number: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Must be exactly 10 digits')
    .required(),
});

const initialValues = { name: '', number: '' };

const ContactForm = () => {
  const { data } = useGetContactsQuery();

  const [addContact, { isLoading }] = useAddContactMutation();

  const onSubmitForm = (values, { resetForm }) => {
    const isContainName = data.some(
      contactName =>
        contactName.name.toLocaleLowerCase() ===
        values.name.toLocaleLowerCase().trim()
    );

    if (isContainName) {
      alert(`${values.name} is already in contacts.`);
      return;
    }

    const formatedNumber = formatterNumber(values.number);

    addContact(values.name, formatedNumber);

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
        <AddBtn type="submit" disabled={isLoading}>
          {isLoading ? `Adding...` : `Add contact`}
        </AddBtn>
      </FormElement>
    </Formik>
  );
};

export default ContactForm;
