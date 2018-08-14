import React from 'react';
import * as renderer from 'react-test-renderer';

import RefilBalanceForm from './RefilBalanceForm';
describe('RefilBalanceForm', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<RefilBalanceForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
