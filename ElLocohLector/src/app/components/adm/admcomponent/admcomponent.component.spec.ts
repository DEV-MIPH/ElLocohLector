import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmcomponentComponent } from './admcomponent.component';

describe('AdmcomponentComponent', () => {
  let component: AdmcomponentComponent;
  let fixture: ComponentFixture<AdmcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmcomponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
