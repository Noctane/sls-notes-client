interface IValues {
  [key: string]: any;
}

export default function validate<T extends IValues>(values: T): ErrorsType {
  const errors = {} as ErrorsType;

  const genericRequiredMsg = 'Ce champs est requis';
  // email
  if (values.hasOwnProperty('email')) {
    if (!values.email) {
      errors.email = genericRequiredMsg;
    }
    if (!/\S+@\S+\.\S+/.test(values.email) && values.email) {
      errors.email = "L'adresse email est invalide";
    }
  }
  // password
  if (values.hasOwnProperty('password') && !values.password) {
    errors.password = genericRequiredMsg;
  }
  // password confirnation
  if (values.hasOwnProperty('confirmPassword')) {
    if (!values.confirmPassword) {
      errors.confirmPassword = genericRequiredMsg;
    }
    if (
      values.confirmPassword !== values.password &&
      values.confirmPassword !== ''
    ) {
      errors.confirmPassword = "Passwords don't match";
    }
  }
  // confirmation code
  if (values.hasOwnProperty('confirmationCode') && !values.confirmationCode) {
    errors.confirmationCode = genericRequiredMsg;
  }

  return errors;
}
