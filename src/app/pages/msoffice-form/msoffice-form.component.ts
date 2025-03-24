import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { FormComponent } from '../../components/form/form.component';
import { Msoffice } from '../../models/msoffice';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ButtonModel } from '../../models/button-model';
import { ActivatedRoute } from '@angular/router';
import { MsofficesService } from '../../services/msoffices.service';
import { RequestService } from '../../services/request.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-msoffice-form',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    FormComponent
  ],
  templateUrl: './msoffice-form.component.html',
  styleUrl: './msoffice-form.component.scss'
})
export class MsofficeFormComponent implements OnInit{

  msoffice:Msoffice= new Msoffice();
  form!: FormGroup;
  formButtons: ButtonModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private  msofficeServices: MsofficesService,
    public requestService: RequestService,
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      serial:['',[Validators.required]],
      title:['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
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
    const itemData: Msoffice = this.route.snapshot.data['officialLetter'];

    if (itemData.id!==0) {
      this.msoffice = new Msoffice(itemData);
    /*  const sentAtFormatted = this.dataService.formatarDataForm(itemData.sentAt);
      itemData.sentAt = sentAtFormatted;
      const receivedAtFormatted = this.dataService.formatarDataForm(itemData.receivedAt);
      itemData.receivedAt = receivedAtFormatted;
      console.log("Log Oficio: ", itemData);*/


      this.form.patchValue(itemData);
    }
  }

  onCancel() {
    this.location.back();

  }

  onAdd() {
    this.requestService.showLoading()
    const formData = this.form.value;
   /* formData.sentAt = this.dataService.formatarData(formData.sentAt);
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
    });*/
  }
}
