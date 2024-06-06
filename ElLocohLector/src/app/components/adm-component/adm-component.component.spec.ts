import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmComponentComponent } from './adm-component.component';

describe('AdmComponentComponent', () => {
  let component: AdmComponentComponent;
  let fixture: ComponentFixture<AdmComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
