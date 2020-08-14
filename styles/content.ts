import styled, { css } from 'styled-components'

interface H2Props {
  readonly center?: boolean
}

interface InputProps {
  readonly button?: boolean
}

interface RowProps {
  readonly right?: boolean
}

// typography (alphabetical order)
export const H1 = styled.h1`
  font-size: 2rem;
  text-align: center;
`

export const H2 = styled.h2<H2Props>`
  font-size: 1.6rem;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  margin-top: 0;
`

// styled components (alphabetical order)
export const A = styled.a`
  cursor: pointer;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  color: black;
  background: lightblue;
  border-radius: 5px;
  padding: 0.5em 0.75em;

  display: inline-flex;

  &:focus,
  &:hover {
    opacity: 0.7;
  }
`

export const Card = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto 2em;
  padding: 1em;
  border: 1px solid black;
  border-radius: 10px;
`

export const Container = styled.div`
  width: 90%;
  max-width: 1100px;
  margin: 0 auto;
`

export const DeleteButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  margin: 0;
  padding: 0;
  border: none;

  &:focus,
  &:hover {
    opacity: 0.6;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`

export const Form = styled.form`
  text-align: center;
  margin: 1em 0 2em;
  display: flex;
  flex-direction: column;
`

export const Input = styled.input<InputProps>`
  width: 90%;
  max-width: 300px;
  height: 40px;
  margin: 0 auto;

  & + & {
    margin-top: 1em;
  }

  ${({ button }) =>
    button &&
    css`
      cursor: pointer;
    `}
`

export const Row = styled.div<RowProps>`
  display: flex;
  justify-content: ${({ right }) => (right ? 'flex-end' : 'flex-start')};
`
