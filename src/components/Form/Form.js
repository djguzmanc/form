import React from 'react';
import Input from '../ui/Input/Input';
import bgImg from '../../assets/texture.png';
import { useForm } from 'react-hook-form';
import './Form.scss';
import ErrorMapper from './ErrorMapper/ErrorMapper';

const Form = ({
  submit,
  responseState,
  handleReset
}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const atLeastOneCheckbox = () =>
    getValues('adv') || getValues('alert') || getValues('comms');

  return (
    <section
      className="Form"
      style={{
        backgroundImage: `url(${bgImg})`
      }}>
      <h1 className="Form__title">Sign up for email updates</h1>
      <span>*Indicates Required Field</span>

      <form
        className="data-form"
        onSubmit={handleSubmit(submit)}>
        <ErrorMapper errors={errors} />

        <fieldset className="data-form__fieldset">
          <div className="data-form__field">
            <Input
              {...register('fname', {
                required: true,
              })}
              label="FIRST NAME*"
              hasError={errors.fname}
              id="fname"
              type="text" />
          </div>
          <div className="data-form__field">
            <Input
              {...register('lname', {
                required: true
              })}
              label="LAST NAME*"
              hasError={errors.lname}
              id="lname"
              type="text" />
          </div>
          <div className="data-form__field">
            <Input
              {...register('email', {
                required: true,
                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              label="EMAIL ADDRESS*"
              hasError={errors.email}
              id="email"
              type="email" />
          </div>
          <div className="data-form__field">
            <Input
              {...register('org')}
              hasError={errors.org}
              id="org"
              label="ORGANIZATION"
              type="text" />
          </div>
        </fieldset>

        <fieldset className="data-form__fieldset">
          <div className="data-form__field">
            <label className="field-label" htmlFor="eu-res">EU RESIDENT*</label>
            <select
              {...register('eu-res', {
                required: true,
                validate: value => value !== 'default',
              })}
              id="eu-res"
              name="eu-res"
              defaultValue="default">
              <option disabled value="default">- SELECT ONE -</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </fieldset>

        <fieldset className="data-form__fieldset">
          <div className="data-form__field">
            <Input
              {...register('adv', {
                deps: ['alert', 'comms'],
                validate: atLeastOneCheckbox
              })}
              customErrorId="box"
              hasError={errors.adv}
              id="adv"
              type="checkbox"
              label="ADVANCES" />
          </div>

          <div className="data-form__field">
            <Input
              {...register('alert', {
                deps: ['adv', 'comms'],
                validate: atLeastOneCheckbox
              })}
              hasError={errors.alert}
              customErrorId="box"
              id="alert"
              type="checkbox"
              label="ALERTS" />
          </div>

          <div className="data-form__field">
            <Input
              {...register('comms', {
                deps: ['alert', 'adv'],
                validate: atLeastOneCheckbox
              })}
              customErrorId="box"
              hasError={errors.comms}
              id="comms"
              type="checkbox"
              label="OTHER COMMUNICATIONS" />
          </div>
        </fieldset>

        {responseState && (
          <div className={
            'response-box ' + (responseState.success ? '' : 'response-box--failure')
          }>
            {responseState.message}
          </div>
        )}

        <button className="btn push-sibling btn-form">
          SUBMIT
        </button>

        <button
          type="button"
          className="btn btn--no-bg btn-form"
          onClick={() => {
            reset();
            handleReset();
          }}>
          RESET
        </button>
      </form>

    </section>
  );
}

export default Form;
