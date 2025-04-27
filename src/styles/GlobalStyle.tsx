import { Global, css } from '@emotion/react';

const styles = css`
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/PretendardVariable.woff2') format('woff2-variations');
    font-weight: 45 920;
    font-style: normal;
    font-display: swap;
  }
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
    font-family:
      'Pretendard Variable',
      Pretendard,
      -apple-system,
      BlinkMacSystemFont,
      system-ui,
      Roboto,
      'Helvetica Neue',
      'Segoe UI',
      'Apple SD Gothic Neo',
      'Noto Sans KR',
      'Malgun Gothic',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      sans-serif;
    background-color: #fff;
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
