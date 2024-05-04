import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntodonacionComponent } from './puntodonacion.component';

describe('PuntodonacionComponent', () => {
  let component: PuntodonacionComponent;
  let fixture: ComponentFixture<PuntodonacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuntodonacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PuntodonacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
