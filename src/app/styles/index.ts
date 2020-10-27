import { createGlobalStyle } from "styled-components";
import colors from "./colors";

const GlobalStyle = createGlobalStyle`
* {
  padding: 0px;
  margin: 0;
  box-sizing: border-box;
}
html {
  font-size: 20px;
  color: ${colors.PRESTIGE_BLUE};
}
body, input, textarea, button {
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

button {
  cursor: pointer;
}

.app {
  height: 100vh;
  width: 100%;
}
main {
  height: calc(100vh - 80px);
  overflow: auto;
  padding: 20px 40px;
}

.main-loader {
  height: 100vh;
  width: 100%;
}


.text-14 {
  font-size: 0.7rem;
}
.text-16 {
  font-size: 0.8rem;
}
.text-18 {
  font-size: 0.9rem;
}
.text-22 {
  font-size: 1.1rem;
}
.text-24 {
  font-size: 1.2rem;
}
.text-28 {
  font-size: 1.4rem;
}
.text-36 {
  font-size: 1.8rem;
}
.text-38 {
  font-size: 1.9rem;
}
.text-48 {
  font-size: 2.4rem;
}
.text-56 {
  font-size: 2.8rem;
}
`;

export default GlobalStyle;
