import { Global, css } from '@emotion/react';

const styles = css`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html,
  body {
    height: 100%;
    background-color: rgba(30, 30, 47);
    color: #000;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  ul,
  ol {
    list-style: none;
  }
  button {
    background: none;
    border: none;
    cursor: pointer;
    font: inherit;
  }
  input,
  textarea {
    font: inherit;
    border: none;
    outline: none;
  }
`;

const GlobalStyle = () => <Global styles={styles} />;

export default GlobalStyle;
