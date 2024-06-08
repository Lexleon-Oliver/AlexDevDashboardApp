import { AbstractControl } from "@angular/forms";

export function passwordLowerValidator(control: AbstractControl) {
  var retorno = false;
  const password = control.value as string;
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  if (password && password.length > 0) {
    for (let index = 0; index < password.length; index++) {
      const caracter = password[index];
      if (lowerCase.includes(caracter)){
        retorno=true;
      }
    }
      if(!retorno) {
        return { lower: true };
      } else
      return null;

    }
    return null;
}
