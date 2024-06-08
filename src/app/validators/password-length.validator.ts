import { AbstractControl } from "@angular/forms";

export function passwordLengthValidator(control: AbstractControl) {

  const password = control.value as string;
  if(password){
    if(password.length < 8) {
        return { tamanho: true };
    } else
    return null;

  }
  return null;
}
