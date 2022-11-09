/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { FaArrowDown } from 'react-icons/fa';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  color: ${(props) => props.theme.text};
  text-align: center;

  @keyframes H1P {
    from {
      translate: -100%;
    }
  }
  @keyframes Arrow {
    from {
      translate: 0 550%;
    }
  }
`;

export const H1 = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-family: ${(props) => props.theme.fontSans};
  animation: 1s H1P linear;
`;

export const P = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-family: ${(props) => props.theme.fontSans};
  animation: 1s H1P linear;
`;

export const ArrowDown = styled(FaArrowDown)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: ${(props) => props.theme.text};
  animation: 1s Arrow linear;
  height: 3em;
  width: 3em;

  :hover {
    color: ${(props) => props.theme.accentColor};
    transition: 0.5s all cubic-bezier(0.175, 0.885, 0.32, 1.275);
    width: 5em;
    height: 5em;
  }
`;
