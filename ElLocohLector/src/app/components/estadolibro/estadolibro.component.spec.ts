import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadolibroComponent } from './estadolibro.component';

describe('EstadolibroComponent', () => {
  let component: EstadolibroComponent;
  let fixture: ComponentFixture<EstadolibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadolibroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadolibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
