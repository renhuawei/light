import React from 'react';
import { Field } from 'formik';
import MaskedInput from 'react-text-mask';
import Message from 'components/Message';
import { StyledContainer, StyledInput, StyledLabel } from './styles';

const Input = ({ name, label, innerRef, ...props }) => (
  <Field
    name={name}
    render={({ field, form }) => {
      return (
        <StyledContainer>
          <StyledLabel
            htmlFor={name}
            error={form.touched[name] && form.errors[name]}
          >
            {label}
          </StyledLabel>
          <MaskedInput
            {...props}
            {...field}
            ref={innerRef}
            error={form.touched[name] && form.errors[name]}
            render={(ref, props) => <StyledInput innerRef={ref} {...props} />}
          />
          {form.touched[name] &&
            form.errors[name] && (
              <Message type="error">{form.errors[name]}</Message>
            )}
        </StyledContainer>
      );
    }}
  />
);

export default Input;
