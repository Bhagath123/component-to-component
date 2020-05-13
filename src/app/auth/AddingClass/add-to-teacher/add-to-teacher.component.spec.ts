import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToTeacherComponent } from './add-to-teacher.component';

describe('AddToTeacherComponent', () => {
  let component: AddToTeacherComponent;
  let fixture: ComponentFixture<AddToTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
