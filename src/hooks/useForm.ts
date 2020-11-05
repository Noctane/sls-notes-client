import { useState, useEffect } from 'react';

type TCallBack = (data: any) => void;
type TValidate = (val: any) => ErrorsType;

function useForm(callback: TCallBack, validate: TValidate, initialValues: any) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(values);
      setIsSubmitting(false);
    }
  }, [callback, errors, isSubmitting, values]);

  const handleSubmit = (
    event: React.MouseEvent | React.FormEvent<HTMLFormElement>
  ) => {
    if (event) event.preventDefault();
    setIsSubmitting(true);
    setErrors(validate(values));
  };

  const handleBlur = () => {
    setErrors(validate(values));
  };

  const handleFocus = () => {
    setErrors({});
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target as HTMLInputElement;
    if (files && files.length > 0) {
      setValues((val: any) => ({
        ...val,
        [name]: files[0],
      }));
    }
  };
  console.log(values);

  const handleChange = (
    event:
      | React.FormEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.persist();
    const { value, name } = event.target as
      | HTMLInputElement
      | HTMLTextAreaElement;
    setValues((val: any) => ({
      ...val,
      [name]: value,
    }));
  };

  const reset = () => {
    setValues(initialValues);
  };

  return {
    handlers: {
      handleFileChange,
      handleChange,
      handleSubmit,
      handleBlur,
      handleFocus,
      reset,
    },
    values,
    setValues,
    errors,
  };
}

export default useForm;
