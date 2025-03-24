import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsofficeFormComponent } from './msoffice-form.component';

describe('MsofficeFormComponent', () => {
  let component: MsofficeFormComponent;
  let fixture: ComponentFixture<MsofficeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsofficeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MsofficeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
