import { AbstractControl } from "@angular/forms";

export function passwordUpperValidator(control: AbstractControl) {
  var retorno = false;
  const password = control.value as string;
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (password && password.length > 0) {

    for (let index = 0; index < password.length; index++) {
      const caracter = password[index];
      if (upperCase.includes(caracter)){
        retorno=true;
      }
    }
      if(!retorno) {
        return { upper: true };
      } else
      return null;
    }
    return null;
  }
