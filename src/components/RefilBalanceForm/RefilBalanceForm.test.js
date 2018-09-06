import React from 'react';

import RefilBalanceForm from './RefilBalanceForm';
import Formik from './index';

const snapshotAfterRerender = component => {
  component.update();
  expect(component).toMatchSnapshot();
};

const snapshotWithDelay = async component => {
  await new Promise(res => setTimeout(res, 500));
  snapshotAfterRerender(component);
};

describe('RefilBalanceForm', () => {
  it('render correctly', () => {
    const component = shallow(
      <RefilBalanceForm
        provider={{ id: 1, name: 'MTS' }}
        values={{ phone: '+7 999 99 99', amount: '999' }}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders server error', () => {
    const component = shallow(
      <RefilBalanceForm
        provider={{ id: 1, name: 'MTS' }}
        values={{ phone: '+7 999 99 99', amount: '999' }}
        status={{ serverError: 'Sorry! Service is temporary unavailable.' }}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders message about succeeded submission', () => {
    const component = shallow(
      <RefilBalanceForm
        provider={{ id: 1, name: 'MTS' }}
        values={{ phone: '+7 999 99 99', amount: '999' }}
        status={{
          isFormSubmitSucceeded: true
        }}
      />
    );
    expect(component).toMatchSnapshot();
  });
});

describe('Formik', () => {
  it('correctly validate form submission', async () => {
    const component = mount(<Formik provider={{ id: 1, name: 'MTS' }} />);
    //Render initial state
    expect(component).toMatchSnapshot();

    const Form = component
      .children()
      .first()
      .children()
      .first();

    const formProps = Form.props();
    await formProps.handleSubmit();

    //Render form during formik validation phase
    snapshotAfterRerender(component);

    //Render after validation phase
    await snapshotWithDelay(component);

    //Entering wrong form values
    const inputs = component.find('input');
    const [phoneInput, amountInput] = [inputs.at(0), inputs.at(1)];
    phoneInput.simulate('change', {
      target: { name: 'phone', value: '+7 (999) 99' }
    });
    amountInput.simulate('change', {
      target: { name: 'amount', value: '2000' }
    });
    component.update();
    await formProps.handleSubmit();
    await snapshotWithDelay(component);

    //Entering correct form values
    phoneInput.simulate('change', {
      target: { name: 'phone', value: '+7 (999) 999-99-99' }
    });
    amountInput.simulate('change', {
      target: { name: 'amount', value: '999' }
    });
    await formProps.handleSubmit(
      {},
      {
        props: formProps,
        ...formProps
      }
    );
    await snapshotWithDelay(component);
  });
});
