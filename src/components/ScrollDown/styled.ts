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
