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

    toast.success('Send');
    try {
      await emailjs.sendForm(
        'service_31sck9d',
        'template_hvdy8wi',
        form.current,
        'ZmgzaXS3KnCp7lV6n',
      );
    } catch (error) {
      console.log(error);
      toast.error('Error, try again');
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
