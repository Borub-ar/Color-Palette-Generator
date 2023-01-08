import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    :root {
        --panelColor: #e9e9e9;
    }

    body {
        height: 100vh;
        font-family: 'Roboto Condensed', sans-serif;
    }

    *,
    *::after,
    *::before {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
`;
