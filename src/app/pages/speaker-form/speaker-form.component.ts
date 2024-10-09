import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { FormComponent } from '../../components/form/form.component';
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { SelectFormComponent } from '../../components/select-form/select-form.component';
import { Speaker } from '../../models/speaker';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ButtonModel } from '../../models/button-model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SpeakersService } from '../../services/speakers.service';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-speaker-form',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    FormComponent,
    InputFormComponent,
    SelectFormComponent,
  ],
  templateUrl: './speaker-form.component.html',
  styleUrl: './speaker-form.component.scss'
})
export class SpeakerFormComponent {

  speaker:Speaker= new Speaker();
  form!: FormGroup;
  formButtons: ButtonModel[] = [];
  constructor(
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private speakersServices: SpeakersService,
    public requestService: RequestService,
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      model: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
      inUse: [false],
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
    const itemData: Speaker = this.route.snapshot.data['speaker'];

    if (itemData.id!==0) {
      this.speaker = new Speaker(itemData);
      this.form.patchValue(itemData);
    }
  }

  onCancel() {
    this.location.back();

  }

  onAdd() {
    this.requestService.showLoading()
    const formData = this.form.value;
    formData.model = formData.model.toUpperCase();

    Object.assign(this.speaker, formData);
    let itemData = new Speaker(this.speaker);
    this.speakersServices.save(itemData).subscribe({
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
