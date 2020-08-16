import styled, { css } from 'styled-components'
import {
  H2Props,
  AProps,
  ButtonProps,
  CardProps,
  ContainerProps,
  DivProps,
  FormProps,
  InputProps,
  SectionProps,
  SpanProps,
} from './styleTypes'

// typography (alphabetical order)
export const H1 = styled.h1`
  font-size: 2rem;
  text-align: center;
`

export const H2 = styled.h2<H2Props>`
  font-size: 1.6rem;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  color: ${({ important }) => (important ? '#ed2f6c' : '#f8f8f8')};
  opacity: ${({ light }) => (light ? '0.5' : '1')};
  margin-top: 0;
`

export const P = styled.p`
  color: #ffffff;
`

// styled components (alphabetical order)
export const A = styled.a<AProps>`
  cursor: pointer;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  color: #ffffff;
  background: #49545b;
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

  &:focus {
    outline: none;
  }

  ${({ filter }) =>
    filter &&
    css`
      display: inline-flex;
      color: #ffffff;
      background: #ed2f6c;
      margin-left: 1em;
      padding: 0.3em;

      &:hover {
        opacity: 1;
      }
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
      background: #03a1a8;
      opacity: 1;
    `}

    ${({ navButton }) =>
      navButton &&
      css`
        cursor: pointer;
        background: none;
        margin: 0 0 0 -30px;
        padding: 0;
        opacity: 1;
      `}
`

export const Card = styled.div<CardProps>`
  position: relative;
  background: #2e3135;
  width: 100%;
  max-width: 500px;
  margin: 0 auto 2em;
  padding: 1em;
  border-radius: 10px;

  ${({ form }) =>
    form &&
    css`
      width: 90%;
      border-radius: 3px;
    `}
`

export const Container = styled.div<ContainerProps>`
  width: 90%;
  max-width: 500px;
  margin: 0 auto;

    ${({ nav }) =>
      nav &&
      css`
        max-width: 1000px;
        display: flex;
        justify-content: space-between;
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

export const Div = styled.div<DivProps>`
  margin-bottom: 2em;

  ${({ form }) =>
    form &&
    css`
      text-align: left;
      margin: 1em 0 1.5em;
    `}
`

export const Footer = styled.footer`
  font-size: 0.625rem;
  text-align: center;
  color: #ffffff;
  background: #345268;
  padding: 0.5em 0;
`

export const Form = styled.form<FormProps>`
  text-align: center;
  display: flex;
  flex-direction: column;

  ${({ nav }) =>
    nav &&
    css`
      flex-direction: row;
      margin: 0;
    `}
`

export const Header = styled.header`
  padding: 1em 0;
  background: #090909;
  border-bottom: 1px solid black;
`

export const Input = styled.input<InputProps>`
  width: 100%;
  height: 40px;
  color: #ffffff;
  margin: 0 auto 1em;
  background: #49545b;
  border: none;
  border-radius: 3px;

  &::placeholder {
    color: #c6c6c6;
  }

  &:focus {
    outline: none;
  }

  ${({ button }) =>
    button &&
    css`
      cursor: pointer;
      color: #ffffff;
      font-weight: 500;
      margin: 0 auto;
      background: #00c6cf;
      border: none;
      border-radius: 3px;

      &:focus,
      &:hover {
        opacity: 0.7;
      }

      &:focus {
        outline: none;
      }
    `}

  ${({ nav }) =>
    nav &&
    css`
      display: inline-flex;
      width: 180px;
      margin: 0;
    `}

  ${({ navButton }) =>
    navButton &&
    css`
      display: inline-flex;
      justify-content: center;
      width: 40px;
      margin: 0 0 0 -40px;
      background: #a9cec2;
    `}
`

export const Label = styled.label`
  color: #ffffff;
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

export const Section = styled.section<SectionProps>`
  padding: 1em 0 2em;
  background: #111111;
  min-height: 100vh;

  ${({ edit }) =>
    edit &&
    css`
      padding-top: 5em;
    `}
`

export const Span = styled.span<SpanProps>`
  color: #ffffff;

  ${({ date }) =>
    date &&
    css`
      font-size: 0.625rem;
      color: #98999f;
      align-self: flex-end;
    `}
`
export const TextArea = styled.textarea`
  display: block;
  width: 90%;
  min-width: 100%;
  max-width: 100%;
  min-height: 70px;
  color: #ffffff;
  margin: 0 auto 1em;
  background: #49545b;
  border: none;
  border-radius: 3px;

  &::placeholder {
    color: #c6c6c6;
  }

  &:focus {
    outline: none;
  }
`
