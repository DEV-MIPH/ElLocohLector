import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddejemplarComponent } from './addejemplar.component';

describe('AddejemplarComponent', () => {
  let component: AddejemplarComponent;
  let fixture: ComponentFixture<AddejemplarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddejemplarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddejemplarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
