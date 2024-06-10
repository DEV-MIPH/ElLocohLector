import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmbooksComponent } from './admbooks.component';

describe('AdmbooksComponent', () => {
  let component: AdmbooksComponent;
  let fixture: ComponentFixture<AdmbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmbooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
