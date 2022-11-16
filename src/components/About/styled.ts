/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

import photo from '../../assets/imgs/photo.png';

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.text};
  flex-flow: wrap column;
  height: 113.5vh;

  @keyframes P {
    from {
      translate: 100%;
      border: none;
    }
    to {
      border: 3px solid ${(props) => props.theme.overlay};
    }
  }
  @keyframes H1 {
    from {
      translate: 100%;
    }
    to {
      translate: 10%;
    }
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
  /* animation: 1s P linear; */
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
  /* animation: 1s P linear; */
`;

export const H1 = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  /* animation: 1s H1 linear; */
`;
