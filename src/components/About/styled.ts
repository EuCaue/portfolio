/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import photo from '../../assets/imgs/photo.png';

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.text};
  flex-flow: wrap column;
  margin-top: 0.5em;
  h1 {
    :hover {
      font-size: 22px;
      color: ${(props) => props.theme.accentColor};
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
  animation: 1s P linear;

  @keyframes P {
    from {
      margin: 50em;
      border: none;
    }
    to {
      border: 3px solid ${(props) => props.theme.overlay};
    }
  }
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
