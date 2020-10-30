export default function validate(values: any) {
  const errors = {} as ErrorsType;

  const genericRequiredMsg = 'Ce champs est requis';

  if (!values.email) {
    errors.email = genericRequiredMsg;
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "L'adresse email est invalide";
  }

  if (!values.cp) {
    errors.cp = genericRequiredMsg;
  } else if (!/^(?:[0-8]\d|9[0-8])\d{3}$/.test(values.cp)) {
    errors.cp = 'Code postal incorrect';
  }
  if (!values.city) {
    errors.city = genericRequiredMsg;
  }
  if (!values.address) {
    errors.address = genericRequiredMsg;
  }
  if (!values.date) {
    errors.date = genericRequiredMsg;
  }
  if (!values.message) {
    errors.message = genericRequiredMsg;
  }

  return errors;
}
