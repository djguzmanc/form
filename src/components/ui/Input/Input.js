import React from 'react';
import './Input.scss';

const Input = React.forwardRef(({
  hasError = false,
  id,
  label,
  type,
  customErrorId,
  ...inputProps
}, ref) => {

  const classes = [];
  hasError && classes.push('with-error');

  const customProps = {};
  hasError && (customProps['aria-invalid'] = true);
  hasError && (customProps['aria-errormessage'] = `${customErrorId ?? id}-error`);

  if (type === 'checkbox') {
    return (
      <label className='checkbox-custom-container'>
        <input
          ref={ref}
          className={classes.join(' ')}
          id={id}
          name={id}
          type={type}
          {...customProps}
          {...inputProps} />
        {label && <label
          className="field-label"
          htmlFor={id}>{label}</label>}
        <span className="ibk-custom-mark"></span>
      </label>
    );
  }

  return (
    <>
      {label && <label
        className="field-label"
        htmlFor={id}>{label}</label>}

      <input
        ref={ref}
        className={classes.join(' ')}
        id={id}
        name={id}
        type={type}
        {...customProps}
        {...inputProps} />
    </>
  );
})

export default Input;
