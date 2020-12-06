import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #483c63;
  color: white;
  width: 95%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid white;

  @media (min-width: 1000px) {
    width: 70%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;

  & > input {
    background-color: #483c63;
    color: white;
    border: 2px solid white;
  }

  textarea {
    color: white;
    border: 2px solid white;
    resize: none;
    background-color: #483c63;
  }
`;

const SubmitButton = styled.button`
  width: 200px;
  margin: 20px auto;
`;

const ContactForm = () => {
  return (
    <Wrapper>
      <h3>Kontakt</h3>
      <Form name="contact" method="POST" data-netlify="true">
        <input type="hidden" name="bot-field" />
        <input type="hidden" name="form-name" value="contact" />
        <label htmlFor="email">Twój email:</label>
        <input type="email" name="email" />
        <label htmlFor="message">Wiadomość:</label>
        <textarea rows="6" name="message"></textarea>
        <SubmitButton type="submit">Send</SubmitButton>
      </Form>
    </Wrapper>
  );
};

export default ContactForm;
