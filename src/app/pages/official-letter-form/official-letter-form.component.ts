import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { FormComponent } from '../../components/form/form.component';
import { OfficialLetter } from '../../models/official-letter';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ButtonModel } from '../../models/button-model';
import { ActivatedRoute } from '@angular/router';
import { OfficialLettersService } from '../../services/official-letters.service';
import { DataHoraService } from '../../services/data-hora.service';
import { RequestService } from '../../services/request.service';
import { Location } from '@angular/common';
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { DatepickerFormComponent } from '../../components/datepicker-form/datepicker-form.component';
import { TextAreaFormComponent } from '../../components/text-area-form/text-area-form.component';
import { InputNumberFormComponent } from '../../components/input-number-form/input-number-form.component';

@Component({
  selector: 'app-official-letter-form',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    FormComponent,
    InputFormComponent,
    InputNumberFormComponent,
    DatepickerFormComponent,
    TextAreaFormComponent,
  ],
  templateUrl: './official-letter-form.component.html',
  styleUrl: './official-letter-form.component.scss'
})
export class OfficialLetterFormComponent implements OnInit{

  officialLetter:OfficialLetter= new OfficialLetter();
  form!: FormGroup;
  formButtons: ButtonModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private officialLettersServices: OfficialLettersService,
    private dataService: DataHoraService,
    public requestService: RequestService,
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      cod:['',[Validators.required]],
      title:['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
      content: ['',[Validators.required,Validators.minLength(3)]],
      sender:['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
      recipient:['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
      sentAt: ['',[Validators.required]],
      receivedAt: ['',[Validators.required]],
    });
    this.formButtons.push(
      new ButtonModel('', 'bi bi-arrow-return-left', 'default', 'secondary', 'small', false, false, this.onCancel.bind(this)),
      new ButtonModel('', 'bi bi-floppy', 'default', 'success', 'small', false, true, this.onAdd.bind(this),this.form),
    );
  }

  ngOnInit() {
    if(this.requestService.isLoading){
      this.requestService.hideLoading();
    }
    const itemData: OfficialLetter = this.route.snapshot.data['officialLetter'];

    if (itemData.id!==0) {
      this.officialLetter = new OfficialLetter(itemData);
      const sentAtFormatted = this.dataService.formatarDataForm(itemData.sentAt);
      itemData.sentAt = sentAtFormatted;
      const receivedAtFormatted = this.dataService.formatarDataForm(itemData.receivedAt);
      itemData.receivedAt = receivedAtFormatted;

      this.form.patchValue(itemData);
    }
  }

  onCancel() {
    this.location.back();

  }

  onAdd() {
    this.requestService.showLoading()
    const formData = this.form.value;
    formData.sentAt = this.dataService.formatarData(formData.sentAt);
    formData.receivedAt = this.dataService.formatarData(formData.receivedAt);
    formData.title = formData.title.toUpperCase();
    formData.content = formData.content.toUpperCase();
    formData.recipient = formData.recipient.toUpperCase();
    formData.sender = formData.sender.toUpperCase();


    Object.assign(this.officialLetter, formData);
    let itemData = new OfficialLetter(this.officialLetter);
    this.officialLettersServices.save(itemData).subscribe({
      next:(res:any)=>{
        this.requestService.hideLoading()
        this.requestService.trataSucesso(res)
        setTimeout(() => {
          this.onCancel();
        }, 3000);
      },
      error: (error)=>{
        this.requestService.hideLoading()
        this.requestService.trataErro(error );
      }
    });
  }
}
