import styled from 'styled-components';
import { darken } from 'polished';

export const Form = styled.form`
  display: grid;
  max-width: 360px;
  margin: auto;
`;

export const Header = styled.h1`
  text-align: center;
`;

export const Button = styled.button`
  margin: 20px auto;
  height: 39px;
  width: 100%;
  border-radius: 4px;
  background: floralwhite;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: ${darken(0.2, 'floralwhite')};
  }
`;
