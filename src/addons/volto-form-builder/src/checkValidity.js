const checkValidity = (value, rules) => {
  let isValid = true;
  if (rules) {
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minlength) {
      isValid = value.length >= 6 && isValid;
    }
    if (rules.maxlength) {
      isValid = value.length <= 6 && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
  }

  return isValid;
};

export default checkValidity;
