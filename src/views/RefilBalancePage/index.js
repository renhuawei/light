import React from 'react';
import RefilBalanceForm from 'components/RefilBalanceForm';
import withLoader from 'components/withLoader';
import { getProvider } from 'api';
import { ProviderShape } from 'types';

const RefilBalancePage = ({ data, ...props }) => (
  <RefilBalanceForm provider={data} {...props} />
);

RefilBalancePage.propTypes = {
  data: ProviderShape
};

export default withLoader(RefilBalancePage, match =>
  getProvider(match.params.id)
);
