import React from 'react';
import { ProviderShape } from 'types';

import { StyledProviderCard } from './styles';

const ProviderCard = ({ provider }) => (
  <StyledProviderCard to={`/provider/${provider.id}`}>
    <h2>{provider.name}</h2>
  </StyledProviderCard>
);

ProviderCard.propTypes = {
  provider: ProviderShape
};

export default ProviderCard;
