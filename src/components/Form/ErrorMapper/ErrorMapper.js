import React from 'react';
import './ErrorMapper.scss';

const ErrorElement = ({ id, children }) =>
  <div id={`${id}-error`}>{children}</div>;

const ErrorMapper = ({ errors }) => {
  return (
    <span className="data-form__error"><i>
      {errors.fname?.type === 'required'
        && <ErrorElement id="fname">First name is required</ErrorElement>}
      {errors.lname?.type === 'required'
        && <ErrorElement id="lname">Last name is required</ErrorElement>}
      {errors.email?.type === 'required'
        && <ErrorElement id="email">Email is required</ErrorElement>}
      {errors.email?.type === 'pattern'
        && <ErrorElement id="email">Bad email format</ErrorElement>}
      {errors['eu-res']?.type === 'validate'
        && <ErrorElement id="eu-res">EU Resident is required</ErrorElement>}
      {(errors.adv || errors.alert || errors.comms)
        && <ErrorElement id="box">At least one checkbox must be selected</ErrorElement>}
    </i></span>
  );
};

export default ErrorMapper;
