import React from 'react';
import PropTypes from 'prop-types';
import { ProviderShape } from 'types';
import { phoneMask, currencyMask } from 'utils/masks';
import Input from 'components/Input';
import Message from 'components/Message';
import { Form, Header, Button } from './styles';

class RefilBalanceForm extends React.Component {
  componentDidUpdate = prevProps => {
    if (
      prevProps.isSubmitting &&
      !this.props.isSubmitting &&
      !this.props.isValid
    ) {
      const firstIncorrectInputComponent = this[
        Object.keys(this.props.errors)[0]
      ];
      firstIncorrectInputComponent.inputElement.focus();
    }
  };

  setInputRef = key => input => (this[key] = input);

  render() {
    const {
      provider,
      values,
      handleSubmit,
      handleChange,
      handleBlur,
      isSubmitting,
      status = {}
    } = this.props;
    return (
      <div>
        <Header>Refil balance {provider.name}</Header>
        <Form onSubmit={handleSubmit}>
          <Input
            name="phone"
            label="Phone number"
            type="tel"
            mask={phoneMask}
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+7 (978) 802-10-42"
            guide={false}
            innerRef={this.setInputRef('phone')}
          />
          <Input
            name="amount"
            label="Amount"
            mask={currencyMask}
            value={values.amount}
            onChange={handleChange}
            onBlur={handleBlur}
            innerRef={this.setInputRef('amount')}
          />
          {status.serverError && (
            <Message type="error" size="large">
              {status.serverError}
            </Message>
          )}
          {status.isFormSubmitSucceeded && (
            <Message type="success" size="large">
              Success! You will be redirected to the home page soon.
            </Message>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting' : 'Submit'}
          </Button>
        </Form>
      </div>
    );
  }
}

RefilBalanceForm.propTypes = {
  provider: ProviderShape,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  status: PropTypes.shape({
    isFormSubmitSucceeded: PropTypes.bool,
    serverError: PropTypes.string
  }),
  values: PropTypes.shape({
    phone: PropTypes.string,
    amount: PropTypes.string
  }),
  errors: PropTypes.shape({
    phone: PropTypes.string,
    amount: PropTypes.string
  })
};

export default RefilBalanceForm;
