import styled, { css } from 'styled-components'

interface AProps {
  readonly nav?: boolean
}

interface ButtonProps {
  readonly filter?: boolean | string
  readonly bright?: boolean
  readonly moreNotes?: boolean
}

interface ContainerProps {
  readonly nav?: boolean
  readonly pagination?: boolean
  readonly row?: boolean
}

interface FormProps {
  readonly nav?: boolean
}

interface H2Props {
  readonly center?: boolean
  readonly important?: boolean
  readonly light?: boolean
}

interface InputProps {
  readonly button?: boolean
  readonly nav?: boolean
}

interface SpanProps {
  readonly date?: boolean
}

// typography (alphabetical order)
export const H1 = styled.h1`
  font-size: 2rem;
  text-align: center;
`

export const H2 = styled.h2<H2Props>`
  font-size: 1.6rem;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  color: ${({ important }) => (important ? 'red' : 'black')};
  opacity: ${({ light }) => (light ? '0.5' : '1')};
  margin-top: 0;
`

// styled components (alphabetical order)
export const A = styled.a<AProps>`
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

  ${({ nav }) =>
    nav &&
    css`
      font-size: 1rem;
      background: none;
      border-radius: 0;
      padding: 0;
    `}
`

export const Button = styled.button<ButtonProps>`
  cursor: pointer;
  border: none;
  opacity: ${({ bright }) => (bright ? '1' : '0.5')};

  &:hover {
    opacity: 0.7;
  }

  ${({ filter }) =>
    filter &&
    css`
      display: inline-flex;
      color: #ffffff;
      background: #0ce5e1;
      padding: 0.3em;
    `}

  ${({ moreNotes }) =>
    moreNotes &&
    css`
      display: block;
      width: 100%;
      max-width: 500px;
      height: 40px;
      text-transform: uppercase;
      font-weight: 500;
      color: #fff;
      margin: 0 auto;
      border-radius: 5px;
      background: #0ce5e1;
      opacity: 1;
    `}
`

export const Card = styled.div`
  position: relative;
  background: #ffffff;
  width: 100%;
  max-width: 500px;
  margin: 0 auto 2em;
  padding: 1em;
  border: 1px solid black;
  border-radius: 10px;
`

export const Container = styled.div<ContainerProps>`
  width: 90%;
  max-width: 1100px;
  margin: 0 auto;

    ${({ nav }) =>
      nav &&
      css`
        display: flex;
        justify-content: center;
      `}

  ${({ pagination }) =>
    pagination &&
    css`
      width: 100%;
      margin-top: 2em;
    `}

  ${({ row }) =>
    row &&
    css`
      display: flex;
      justify-content: space-between;
    `}
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

export const Div = styled.div`
  margin-bottom: 2em;
`

export const Form = styled.form<FormProps>`
  text-align: center;
  margin: 1em 0 2em;
  display: flex;
  flex-direction: column;

  ${({ nav }) =>
    nav &&
    css`
      margin: 0;
    `}
`

export const Header = styled.header`
  padding: 1em 0;
  background: #ffffff;
  border-bottom: 1px solid black;
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

  ${({ nav }) =>
    nav &&
    css`
      width: 100%;
    `}
`

export const Nav = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
`

export const NavItem = styled.li`
  text-transform: uppercase;

  & + & {
    margin-left: 2em;
  }
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2em;
`

export const Section = styled.section`
  padding: 1em 0 2em;
  background: #f4fffd;
  min-height: 100vh;
`

export const Span = styled.span<SpanProps>`
  ${({ date }) =>
    date &&
    css`
      font-size: 0.625rem;
      opacity: 0.6;
      align-self: flex-end;
    `}
`
