import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    :root {
        --mainBackground: #f7f7f7;
        --panelBtn: #202020;
    }

    body {
        height: 100vh;
        background-color: var(--mainBackground);
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
