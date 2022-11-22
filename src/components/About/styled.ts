/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

import photo from '../../assets/imgs/photo.png';

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.text};
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  height: 113.5vh;
  a {
    position: absolute;
    top: 95vh;
  }
`;

export const PAboutMe = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  color: ${(props) => props.theme.text};
  text-align: center;
  width: 54%;
  line-height: 1.5em;
  margin-top: 0.5em;
  padding: 0.5em;
  border: 3px solid ${(props) => props.theme.overlay};
`;

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-image: url(${photo});
  background-size: 300px 300px;
  background-position-y: -25px;
  background-repeat: no-repeat;
  width: 300px;
  height: 250px;
  margin-bottom: 0.5em;
`;

export const H1 = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
`;
