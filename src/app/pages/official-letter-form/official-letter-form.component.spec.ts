import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialLetterFormComponent } from './official-letter-form.component';

describe('OfficialLetterFormComponent', () => {
  let component: OfficialLetterFormComponent;
  let fixture: ComponentFixture<OfficialLetterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficialLetterFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfficialLetterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
