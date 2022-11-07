/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.text};
  flex-flow: wrap column;
  margin-top: 1em;
  font-family: ${(props) => props.theme.fontSans};
`;

export const PAboutMe = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  color: ${(props) => props.theme.text};
  text-align: center;
  width: 55%;
  line-height: 1.5em;
  margin-top: 0.5em;
  padding: 0.5em;
  border: 3px solid ${(props) => props.theme.overlay};
  animation: 1s P linear;

  @keyframes P {
    from {
      width: 60%;
      margin: 50em;
      border: none;
    }
    to {
      width: 55%;
      border: 3px solid ${(props) => props.theme.overlay};
    }
  }
`;
