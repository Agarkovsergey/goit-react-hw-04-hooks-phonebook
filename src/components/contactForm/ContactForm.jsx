import React, { useState } from 'react';


const ContactForm = ({ createContact }) => {
  const [state, setState] = useState({
    name: '',
    number: '',
  })

  const onSubmit = (e) => {
      e.preventDefault() 
    
    createContact(state);
    setState({
      name: '',
      number: ''
    })
  }

  const onInputChange = ({ target }) => {
    setState({
      ...state,
      [target.name]: target.value
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <input
          type="text"
          name="name"
          value={state.name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          onChange={onInputChange}
      />
      <input
          type="tel"
          name="number"
          value={state.number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          onChange={onInputChange}
      />
      <button type='submit'>Add contact</button>
    </form>
  );
}

export default ContactForm;