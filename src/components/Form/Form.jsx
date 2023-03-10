import { Formik, } from 'formik';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
import PropTypes from "prop-types";

import { FormStyled, Label, Fieldtyled, Button, ErrMessage } from "./Form.styled";

const schema = yup.object().shape({
    name: yup.string().max(15).required(),
    number: yup.string().max(12).required(),
})

const initialValues = {
    name: '',
    number: '',
    id: '',
};

export const Form = ({ onSubmit }) => {
    const handleSubmit = (values, {resetForm}) => {
        const newArray = {
            name: values.name,
            number: values.number,
            id: nanoid(),
        }
        
        onSubmit(newArray)
        resetForm(); 
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handleSubmit}>

            <FormStyled autoComplete="off"> 
             <Label htmlFor="name">Name
             <Fieldtyled
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces.
                For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                        />
                <ErrMessage name='name' component='div' />        
                </Label>

                <Label htmlFor="number">Number
             <Fieldtyled
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                        />
                <ErrMessage name='number' component='div' />        
                </Label>
                <Button type="submit">Add contact</Button>
            </FormStyled>

            </Formik>
    )
}

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired
};