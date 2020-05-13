import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAndDeleteComponent } from './edit-and-delete.component';

describe('EditAndDeleteComponent', () => {
  let component: EditAndDeleteComponent;
  let fixture: ComponentFixture<EditAndDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAndDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAndDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
