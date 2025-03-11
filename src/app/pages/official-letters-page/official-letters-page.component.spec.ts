import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialLettersPageComponent } from './official-letters-page.component';

describe('OfficialLettersPageComponent', () => {
  let component: OfficialLettersPageComponent;
  let fixture: ComponentFixture<OfficialLettersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficialLettersPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfficialLettersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
