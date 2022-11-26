/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { FaArrowDown } from 'react-icons/fa';

export const ArrowDown = styled(FaArrowDown)`
  display: flex;
  justify-content: right;
  align-items: right;
  align-self: flex-end;
  flex-wrap: wrap;
  width: 2em;
  height: 1.5em;
  :hover {
    color: ${(props) => props.theme.accentColor};
    transition: 0.2s all cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
`;

export const LinkArrow = styled.a`
  display: flex;
  justify-content: right;
  align-items: right;
  align-self: flex-end;
  position: absolute;
  right: 0;
  /* top: 207.5vh; */
  color: ${(props) => props.theme.text};
`;
