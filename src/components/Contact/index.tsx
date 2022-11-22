import React, { FormEvent, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { Container, Form, Label, Input, TextArea, InputSubmit } from './styled';

export default function Contact() {
  const form = useRef(null!);
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    toast.success('Send');
    //   try {
    //     const result = await emailjs.sendForm(
    //       'service_31sck9d',
    //       'template_hvdy8wi',
    //       form.current,
    //       'ZmgzaXS3KnCp7lV6n',
    //     );
    //
    //   } catch (error) {
    //     console.log(error);
    //   }
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
            rows={9}
            cols={20}
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
