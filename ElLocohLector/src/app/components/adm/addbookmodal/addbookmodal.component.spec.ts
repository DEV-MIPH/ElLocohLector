import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbookmodalComponent } from './addbookmodal.component';

describe('AddbookmodalComponent', () => {
  let component: AddbookmodalComponent;
  let fixture: ComponentFixture<AddbookmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddbookmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddbookmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
