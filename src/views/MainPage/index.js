import React from 'react';
import PropTypes from 'prop-types';
import ProvidersList from 'components/ProvidersList';
import withLoader from 'components/withLoader';
import { getProviders } from 'api';
import { ProviderShape } from 'types';

export const MainPage = ({ data }) => <ProvidersList providers={data} />;

MainPage.propTypes = {
  data: PropTypes.arrayOf(ProviderShape)
};

export default withLoader(MainPage, getProviders);
