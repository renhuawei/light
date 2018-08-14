import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ProviderCard from 'components/ProviderCard';
import { ProviderShape } from 'types';

const ProvidersListLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  max-width: 640px;
  margin: auto;
  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const ProvidersList = ({ providers }) => (
  <ProvidersListLayout>
    {providers.map(provider => (
      <ProviderCard key={provider.id} provider={provider} />
    ))}
  </ProvidersListLayout>
);

ProvidersList.propTypes = {
  providers: PropTypes.arrayOf(ProviderShape)
};

export default ProvidersList;
