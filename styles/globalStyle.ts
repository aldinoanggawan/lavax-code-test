import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
    }

    body {
        margin: 0;
        padding: 0;
    }
`

export default GlobalStyle
