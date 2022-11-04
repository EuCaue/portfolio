import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 20px;
    font-family: 'Merriweather', serif;

}

html, body, #root {
  height: 100%;
}

body {
  overflow-x: hidden;
  ::-webkit-scrollbar {
  display: none;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
  background-color: ${(props) => props.theme.body}

}


`;
