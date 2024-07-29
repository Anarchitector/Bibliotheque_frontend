import { Global, css } from "@emotion/react"

const globalStyles = css`
  @import url("https://fonts.googleapis.com/css2?family=Chonburi&display=swap");

  * {
    box-sizing: border-box;
  }

  body,
  html {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Chonburi', sans-serif;  // Применение шрифта к телу документа
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
    padding: 0;
    font-family: 'Chonburi', sans-serif;  // Применение шрифта к заголовкам и абзацам
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    align-items: center;
    justify-content: center;
  }
`
function GlobalStyles() {
  return <Global styles={globalStyles} />
}

export default GlobalStyles
