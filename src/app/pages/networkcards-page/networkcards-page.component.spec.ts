import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkcardsPageComponent } from './networkcards-page.component';

describe('NetworkcardsPageComponent', () => {
  let component: NetworkcardsPageComponent;
  let fixture: ComponentFixture<NetworkcardsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkcardsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NetworkcardsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
