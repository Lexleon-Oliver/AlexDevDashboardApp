import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouseFormComponent } from './mouse-form.component';

describe('MouseFormComponent', () => {
  let component: MouseFormComponent;
  let fixture: ComponentFixture<MouseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MouseFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MouseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
