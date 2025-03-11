import { FormGroup } from "@angular/forms";

export class ButtonModel {
  text: string = '';
  icon: string = '';
  type: string = '';
  color: string = '';
  size: string = '';
  rounded: boolean = false;
  disable: boolean = false;
  function!: Function;
  form!: FormGroup;

  constructor(
    text: string = '',
    icon: string = '',
    type: string = '',
    color: string = '',
    size: string = '',
    rounded: boolean = false,
    disable: boolean = false,
    func: Function = () => {},
    form?: FormGroup
  ) {
    this.text = text;
    this.icon = icon;
    this.type = type;
    this.color = color;
    this.size = size;
    this.rounded = rounded;
    this.disable = disable;
    this.function = func;
    this.form = form || new FormGroup({});
  }
}
