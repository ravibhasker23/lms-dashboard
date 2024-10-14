import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { AddCourseComponent } from './add-course.component';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from 'bootstrap';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AddCourseComponent', () => {
  let component: AddCourseComponent;
  let fixture: ComponentFixture<AddCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCourseComponent],
      imports: [StoreModule.forRoot({}), NgbModule],
      providers: [
        {
          provide: Modal,
          useValue: jasmine.createSpyObj('Modal', ['show', 'hide']),
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    component.modalEvent = of('openModal');
    component.courses = [];
    component.totalCourses = [
      {
        id: 1,
        name: 'Course 1',
        domain: 'Domain 1',
        description: 'Description 1',
      },
      {
        id: 2,
        name: 'Course 2',
        domain: 'Domain 2',
        description: 'Description 2',
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal on event', () => {
    spyOn(component, '_subcribeToEvent');
    component.ngOnInit();
    expect(component._subcribeToEvent).toHaveBeenCalledWith('openModal');
  });

  it('should add new course', () => {
    const event = { target: { value: '1_0' } };
    component.addNewCourse(event);
    expect(component.courses.length).toBe(1);
    expect(component.courses[0].name).toBe('Course 1');
  });

  it('should remove course', () => {
    component.courses = [
      {
        id: 1,
        name: 'Course 1',
        domain: 'Domain 1',
        description: 'Description 1',
        progress: 0,
        deadline: '',
        status: '',
        certificate: '',
        goalRisk: false,
      },
    ];
    component.removeCourse(1);
    expect(component.courses.length).toBe(0);
  });

  it('should disable past dates', () => {
    const today: NgbDateStruct = { year: 2024, month: 10, day: 14 };
    const pastDate: NgbDateStruct = { year: 2023, month: 10, day: 14 };
    expect(component.isDisabled(today)).toEqual(true);
    expect(component.isDisabled(pastDate)).toEqual(true);
  });
});
