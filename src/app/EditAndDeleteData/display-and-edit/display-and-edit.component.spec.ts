import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAndEditComponent } from './display-and-edit.component';

describe('DisplayAndEditComponent', () => {
  let component: DisplayAndEditComponent;
  let fixture: ComponentFixture<DisplayAndEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayAndEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
