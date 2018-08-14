import { withFormik } from 'formik';
import * as Yup from 'yup';
import RefilBalanceForm from './RefilBalanceForm';
import { refillAccount } from 'api';
import { extractNumbers } from 'utils/masks';

const schema = Yup.object().shape({
  phone: Yup.string()
    .min(11, 'Phone number should contain 11 digits')
    .max(11, 'Phone number should contain 11 digits')
    .required('Phone number is required.'),
  amount: Yup.number()
    .transform(value => (isNaN(value) ? 0 : value))
    .integer()
    .min(1, 'Min: 1 \u20BD')
    .max(1000, 'Max: 1000 \u20BD')
    .required('The amount of refill is required.')
});

export default withFormik({
  mapPropsToValues: () => ({
    phone: '',
    amount: ''
  }),
  validate: async values => {
    const phone = extractNumbers(values.phone);
    const amount = extractNumbers(values.amount);
    try {
      await schema.validate({ phone, amount }, { abortEarly: false });
    } catch (e) {
      const errors = e.inner.reduce((errors, error) => {
        errors[error.path] = error.message;
        return errors;
      }, {});
      throw errors;
    }
  },
  handleSubmit: async (payload, { props, setSubmitting, setStatus }) => {
    try {
      await refillAccount(payload);
      setStatus({ isFormSubmitSucceeded: true });
      setTimeout(() => props.history.push('/'), 2000);
    } catch (e) {
      setStatus({
        serverError: e.errors[0].message
      });
    }
    setSubmitting(false);
  }
})(RefilBalanceForm);
