import React from 'react';
import { shallow } from 'enzyme';

import { MainPage } from './index';
import withLoader from 'components/withLoader';
import { getProviders } from 'api';

describe('MainPage', () => {
  it('render correctly', async () => {
    const promise = getProviders();
    const loadData = () => promise;
    const MainPageWrapper = withLoader(MainPage, loadData);
    const component = shallow(<MainPageWrapper />);

    //Render initial loading state
    expect(component).toMatchSnapshot();

    //Render MainPage Component after request is resolved
    await promise;
    expect(component).toMatchSnapshot();
  });
});
