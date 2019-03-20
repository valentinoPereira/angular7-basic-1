import { ValidatorFn, AbstractControl } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
      const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;
    const isValidPassword = passwordRegex.test(control.value);

    // console.log('Password test result for ' + control.value, isValidPassword);

    return isValidPassword ? null : {invalidPassword: { value: control.value }};
  };
}
