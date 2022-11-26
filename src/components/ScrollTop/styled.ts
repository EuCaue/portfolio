/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { FaArrowUp } from 'react-icons/fa';

export const ArrowUp = styled(FaArrowUp)`
  display: flex;
  align-items: center;
  justify-content: left;
  align-self: flex-start;
  width: 1.8em;
  height: 1.8em;
  position: absolute;
  top: -20vh;
  left: 172.5vh;
  :hover {
    color: ${(props) => props.theme.accentColor};
    transition: 0.2s all linear;
  }

  @media screen and (max-width: 67em) and (min-width: 20em) {
    top: -23vh;
    left: 90vw;
    /* left: 1vh; */
  }
`;

export const LinkTop = styled.a`
  display: flex;
  align-items: center;
  position: absolute;
  justify-content: center;
  text-decoration: none;
  color: ${(props) => props.theme.text};
`;
