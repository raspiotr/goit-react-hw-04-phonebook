import { useState } from 'react';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export const ContactForm = props => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = nanoid();
  const phoneInputId = nanoid();

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.onSubmitHandle({
      name: name,
      number: number,
    });
    reset();
  };

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.formLabel} htmlFor={nameInputId}>
        Name
      </label>
      <input
        className={css.formInput}
        type="text"
        pattern="[a-zA-Z\s'\-]*"
        name="name"
        id={nameInputId}
        onChange={handleChange}
        value={name}
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label className={css.formLabel} htmlFor={phoneInputId}>
        Number
      </label>
      <input
        className={css.formInput}
        type="tel"
        name="number"
        id={phoneInputId}
        onChange={handleChange}
        value={number}
        pattern="[0-9\s\-]+"
        title="Phone number must be digits and can contain spaces and dashes"
        required
      />
      <button className={css.formButton} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmitHandle: PropTypes.func.isRequired,
};
