import { ComponentFixture, TestBed } from '@angular/core/testing';

import { modalestadolibrosComponent } from './modalestadolibros.component';

describe('ModalibrounoComponent', () => {
  let component: modalestadolibrosComponent;
  let fixture: ComponentFixture<modalestadolibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [modalestadolibrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(modalestadolibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
