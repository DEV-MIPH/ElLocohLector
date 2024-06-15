import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinstmodalComponent } from './addinstmodal.component';

describe('AddinstmodalComponent', () => {
  let component: AddinstmodalComponent;
  let fixture: ComponentFixture<AddinstmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddinstmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddinstmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
