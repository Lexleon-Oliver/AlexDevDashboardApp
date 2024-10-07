import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericListTableComponent } from './generic-list-table.component';

describe('GenericListTableComponent', () => {
  let component: GenericListTableComponent;
  let fixture: ComponentFixture<GenericListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericListTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenericListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
