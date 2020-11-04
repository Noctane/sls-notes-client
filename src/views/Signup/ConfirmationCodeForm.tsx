import React from 'react';
// lib
import useForm from '../../hooks/useForm';
import validate from '../../lib/validationRules';
// components
import FormField from '../../components/FormField';
import Button from '../../components/Button';

interface ConfirmationCodeFormProps {
  sendConfirmationCode: (val: { confirmationCode: string }) => void;
  busy: boolean;
}

export default function ConfirmationCodeForm({
  sendConfirmationCode,
  busy,
}: ConfirmationCodeFormProps) {
  const initialValues = {
    confirmationCode: '',
  };

  const { values, handlers, errors } = useForm(
    sendConfirmationCode,
    validate,
    initialValues
  );
  return (
    <>
      <h1 className="text-3xl font-medium text-gray-700">Confirmation code</h1>
      <div className="rounded border w-2/5 p-8 text-left mx-auto mt-8">
        <form onSubmit={handlers.handleSubmit} className="space-y-6">
          <FormField
            autofocus
            labelMessage="Confirmation Code"
            type="tel"
            name="confirmationCode"
            onChange={handlers.handleChange}
            onFocus={handlers.handleFocus}
            onBlur={handlers.handleBlur}
            isRequired
            value={values.confirmationCode}
            errors={errors}
          />
          <div className="text-center">
            Check your email for the confirmation code
          </div>
          <Button
            type="submit"
            disabled={Object.keys(errors).length > 0 || busy}
            label="Verify"
            busy={busy}
          />
        </form>
      </div>
    </>
  );
}
