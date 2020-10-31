export default function validate(values: any) {
  const errors = {} as ErrorsType;

  const genericRequiredMsg = 'Ce champs est requis';

  if (!values.email) {
    errors.email = genericRequiredMsg;
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "L'adresse email est invalide";
  }
  if (!values.password) {
    errors.password = genericRequiredMsg;
  }

  return errors;
}
