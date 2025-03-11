import { AbstractControl } from "@angular/forms";

export function passwordNumberValidator(control: AbstractControl) {
  var retorno = false;
  const password = control.value as string;
  const number = "0123456789";
  if (password && password.length > 0) {

    for (let index = 0; index < password.length; index++) {
      const caracter = password[index];
      if (number.includes(caracter)){
        retorno=true;
      }
    }
      if(!retorno) {

        return { number: true };
      } else
      return null;
    }
    return null;
  }
