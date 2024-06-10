import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletebookmodalComponent } from './deletebookmodal.component';

describe('DeletebookmodalComponent', () => {
  let component: DeletebookmodalComponent;
  let fixture: ComponentFixture<DeletebookmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletebookmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletebookmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
