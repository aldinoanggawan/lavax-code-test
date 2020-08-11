import styled from 'styled-components'

export const H1 = styled.h1`
  font-size: 2rem;
  text-align: center;
`

export const H2 = styled.h2`
  font-size: 1.6rem;
  margin-top: 0;
`

export const Card = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 1em;
  border: 1px solid black;
  border-radius: 10px;

  & + & {
    margin-top: 2em;
  }
`

export const Container = styled.div`
  width: 90%;
  max-width: 1100px;
  margin: 0 auto;
`
