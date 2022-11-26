import { createGlobalStyle } from 'styled-components';

interface Theme {
  body: string;
  accentColor: string;
  overlay: string;
  surface: string;
  text: string;
  gold: string;
  highlight: string;
  highlightLow: string;
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
    background-color: ${(props) => props.theme.highlight};
  }
}


  @media screen and (max-width: 67em) and (min-width: 20em) {
    overflow: hidden;
}

html, body, #root {
  // height: 100%;
  scroll-behavior: smooth;
}

a {
  text-decoration: none;
}

@font-face {
  font-family: emoji;
  src: local('Apple Color Emoji'),
       local('Android Emoji'),
       local('Segoe UI'),
}

body {
  height: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  ::-webkit-scrollbar {
  display: none;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
background-color: ${(props) => props.theme.body};



.Toastify__toast {
color: ${(props) => props.theme.text};
background-color: ${(props) => props.theme.body};
    font-family: 'Merriweather', serif;
    text-align: center;

}

.Toastify__progress-bar {
background-color: ${(props) => props.theme.accentColor};
color: ${(props) => props.theme.accentColor};
}

.Toastify__close-button {
color: ${(props) => props.theme.text};
}

.Toastify__close-button:hover,
.Toastify__close-button:focus {
    color: ${(props) => props.theme.gold};
}
}


`;
