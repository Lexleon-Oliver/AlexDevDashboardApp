import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkcardFormComponent } from './networkcard-form.component';

describe('NetworkcardFormComponent', () => {
  let component: NetworkcardFormComponent;
  let fixture: ComponentFixture<NetworkcardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkcardFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NetworkcardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
