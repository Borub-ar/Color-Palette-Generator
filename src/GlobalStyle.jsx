import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    :root {
        --main-background: #f7f7f7;
        --main-blue: #288ee2;
        --default-dark: #202020;
    }

    body {
        height: 100vh;
        background-color: var(--main-background);
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
