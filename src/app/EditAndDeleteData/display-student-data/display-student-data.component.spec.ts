import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayStudentDataComponent } from './display-student-data.component';

describe('DisplayStudentDataComponent', () => {
  let component: DisplayStudentDataComponent;
  let fixture: ComponentFixture<DisplayStudentDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayStudentDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayStudentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
