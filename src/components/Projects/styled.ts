/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

interface ProjectsBoxProps {
  image: string;
  width: string;
  height: string;
}

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export const ImageProject = styled.div<ProjectsBoxProps>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: auto;
  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: ${(props) => props.width} ${(props) => props.height};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
