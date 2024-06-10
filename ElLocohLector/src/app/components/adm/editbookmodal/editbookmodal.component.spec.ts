import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbookmodalComponent } from './editbookmodal.component';

describe('EditbookmodalComponent', () => {
  let component: EditbookmodalComponent;
  let fixture: ComponentFixture<EditbookmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditbookmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditbookmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
