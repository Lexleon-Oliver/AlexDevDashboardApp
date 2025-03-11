import { AbstractControl } from "@angular/forms";

export function passwordCharValidator(control: AbstractControl) {
  var retorno = false;
  const password = control.value as string;
  const char = "!@#$%^&*()-+.,";
  if (password && password.length > 0) {
    for (let index = 0; index < password.length; index++) {
      const caracter = password[index];
      if (char.includes(caracter)){
        retorno=true;
      }
    }
      if(!retorno) {
        return { caracter: true };
      } else
      return null;
    }
    return null;
}
