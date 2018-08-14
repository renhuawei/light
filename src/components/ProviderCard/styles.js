import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { darken } from 'polished';

export const StyledProviderCard = styled(Link)`
  display: block;
  height: 200px;
  width: 200px;
  margin: auto;
  background-color: floralwhite;
  border: 1px solid black;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 22px;
  text-align: center;
  &:hover {
    background-color: ${darken(0.2, 'floralwhite')};
  }
`;
