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
  position: fixed;
  top: 94vh;
  left: 0em;
  /* animation: 1s arrow linear; */
  @keyframes arrow {
    from {
      translate: -100%;
    }
  }
`;

export const LinkTop = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${(props) => props.theme.text};
  /* animation: 1s arrow linear; */
`;
