import { createGlobalStyle } from 'styled-components';

interface Theme {
  body: string;
  accentColor: string;
  overlay: string;
}

export default createGlobalStyle<{ theme: Theme }>`
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 20px;
    font-family: 'Merriweather', serif;
 ::selection {
    color: ${(props) => props.theme.accentColor};
    background-color: ${(props) => props.theme.overlay};
  }
}

html, body, #root {
  // height: 100%;
  scroll-behavior: smooth;
}

a {
  text-decoration: none;
}

body {
  overflow-x: hidden;
  ::-webkit-scrollbar {
  display: none;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
background-color: ${(props) => props.theme.body};

}


`;
