import { ValidatorFn, AbstractControl } from '@angular/forms';
const specialCharacters = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
const oneLowercase = /(?=.*[a-z])/;
const oneUppercase = /(?=.*[A-Z])/;
const oneDigit = /(?=.*\d)/;

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;

    if (control.value.trim().length < 8) {
      return null;
    }
    let errors: any = {};

    if (!specialCharacters.test(control.value)) {
      errors.specialCharacters = { value: control.value };
    } else if (!oneLowercase.test(control.value)) {
      errors.oneLowercase = { value: control.value };
    } else if (!oneUppercase.test(control.value)) {
      errors.oneUppercase = { value: control.value };
    } else if (!oneDigit.test(control.value)) {
      errors.oneDigit = { value: control.value };
    } else {
      errors = null;
    }

    // console.log('Password test result for ' + control.value, isValidPassword);

    // return isValidPassword ? null : {invalidPassword: { value: control.value }};
    return errors;
  };
}
