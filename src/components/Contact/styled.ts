/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 115vh;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Form = styled.form`
  display: flex;
  gap: 0.7em;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.4em;
  color: ${(props) => props.theme.text};
  cursor: text;
`;

export const Input = styled.input`
  box-shadow: 0px 0px 5px 5px ${(props) => props.theme.surface};
  display: flex;
  outline: 0;
  text-align: center;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.overlay};
  color: ${(props) => props.theme.text};
  justify-content: center;
  align-items: center;
  font-family: ${(props) => props.theme.fontSans};
  ::placeholder {
    text-align: center;
    color: ${(props) => props.theme.text};
  }
  :hover,
  :focus {
    transition: 0.2s all cubic-bezier(0.165, 0.84, 0.44, 1);
    border: 1px inset ${(props) => props.theme.accentColor};
  }
`;

export const TextArea = styled.textarea`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0;
  border: none;
  border-radius: 5px;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.overlay};
  text-align: center;
  /* width: 21em; */
  /* height: 9em; */
  font-family: ${(props) => props.theme.fontSans};
  ::placeholder {
    text-align: center;
    color: ${(props) => props.theme.text};
  }
  :hover,
  :focus {
    transition: 0.2s all cubic-bezier(0.165, 0.84, 0.44, 1);
    border: 1px inset ${(props) => props.theme.accentColor};
  }

  box-shadow: 0px 0px 5px 5px ${(props) => props.theme.surface};
`;

export const InputSubmit = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 2em;
  transition: 0.3s all linear;
  background-color: ${(props) => props.theme.overlay};
  color: ${(props) => props.theme.text};
  outline: 0;
  border: 0;
  border-radius: 5px;
  :hover,
  :focus {
    cursor: pointer;
    background-color: ${(props) => props.theme.surface};
transition: 0.2s all cubic-bezier(0.165, 0.84, 0.44, 1);
    border: 1px inset ${(props) => props.theme.accentColor};

  }
`;
