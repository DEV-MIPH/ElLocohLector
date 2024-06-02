import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrasennaComponent } from './contrasenna.component';

describe('ContrasennaComponent', () => {
  let component: ContrasennaComponent;
  let fixture: ComponentFixture<ContrasennaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContrasennaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContrasennaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
