import styled from 'styled-components';

const mapColors = {
  error: 'red',
  success: 'green'
};

const mapSize = {
  small: '16px',
  large: '22px'
};

const StyledMessage = styled.div`
  margin-top: 4px;
  color: ${props => mapColors[props.type]};
  font-size: ${props => mapSize[props.size]};
`;

StyledMessage.defaultProps = {
  size: 'small'
};

export default StyledMessage;
