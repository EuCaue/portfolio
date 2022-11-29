/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
import React, { FormEvent, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { Container, Form, Label, Input, TextArea, InputSubmit } from './styled';

export default function Contact() {
  const form = useRef(null!);
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await emailjs.sendForm(
        `${import.meta.env.VITE_SERVICE_ID}`,
        `${import.meta.env.VITE_TEMPLATE_ID}`,
        form.current,
        `${import.meta.env.VITE_PUBLIC_KEY}`,
      );
      toast.success('Send');
    } catch (error) {
      console.log(error);
      toast.error('Please, try again.');
    }
  };

  return (
    <Container id="contact">
      <Form ref={form} onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <Label htmlFor="name">
          Name:
          <Input
            type="text"
            required
            name="name"
            minLength={3}
            maxLength={50}
            placeholder="Name"
          />
        </Label>
        <Label htmlFor="email">
          Email:
          <Input type="email" required name="email" placeholder="Email" />
        </Label>
        <Label htmlFor="message">
          Message:
          <TextArea
            required
            name="message"
            placeholder="Type here your message"
          />
        </Label>
        <Label htmlFor="submit">
          <InputSubmit type="submit" name="submit" value="Send" />
        </Label>
      </Form>
    </Container>
  );
}
