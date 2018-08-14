import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 20px 0;
`;

export const StyledInput = styled.input`
  height: 39px;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  color: #555;
  font-size: 16px;
}
`;

export const StyledLabel = styled.label`
  display: block;
  color: ${props => (props.error ? 'red' : 'inherit')};
`;
