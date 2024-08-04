import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MousesPageComponent } from './mouses-page.component';

describe('MousesPageComponent', () => {
  let component: MousesPageComponent;
  let fixture: ComponentFixture<MousesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MousesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MousesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
