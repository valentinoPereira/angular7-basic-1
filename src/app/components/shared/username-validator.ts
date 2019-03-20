import { ValidatorFn, AbstractControl } from '@angular/forms';

export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
      const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
      // tslint:disable-next-line:max-line-length
      const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const isValidMobileNumber = mobileRegex.test(control.value);
    const isValidEmailId = emailRegex.test(control.value);

    // console.log(`Mobile Regex test result with value ${control.value}: `, mobileRegex.test(control.value));
    // console.log(`Email Regex test result with value ${control.value}: `, emailRegex.test(control.value));

    if (isValidMobileNumber || isValidEmailId) {
      return null;
    } else {
      return { invalidPattern: { value: control.value } };
    }
  };
}
