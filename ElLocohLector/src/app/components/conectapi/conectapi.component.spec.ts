import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConectapiComponent } from './conectapi.component';

describe('ConectapiComponent', () => {
  let component: ConectapiComponent;
  let fixture: ComponentFixture<ConectapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConectapiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConectapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
