import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { AddCourseComponent } from './add-course.component';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from 'bootstrap';
import { Subject, of } from 'rxjs';
import { ICourse, ILmsDashboardState, ITotalCourses } from '../../../store/lms-dashboard-state.model';
import { SetUpdatedCourses } from '../../../store';

describe('AddCourseComponent', () => {
  let component: AddCourseComponent;
  let fixture: ComponentFixture<AddCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCourseComponent],
      imports: [StoreModule.forRoot({})],
      providers: [
        { provide: Modal, useValue: jasmine.createSpyObj('Modal', ['show', 'hide']) }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    component.modalEvent = of('openModal');
    component.courses = [];
    component.totalCourses = [
      { id: 1, name: 'Course 1', domain: 'Domain 1', description: 'Description 1' },
      { id: 2, name: 'Course 2', domain: 'Domain 2', description: 'Description 2' }
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
    expect(component.courses.name).toBe('Course 1');
  });

  it('should remove course', () => {
    component.courses = [{ id: 1, name: 'Course 1', domain: 'Domain 1', description: 'Description 1' }];
    component.removeCourse(1);
    expect(component.courses.length).toBe(0);
  });

  it('should disable past dates', () => {
    const today: NgbDateStruct = { year: 2024, month: 10, day: 14 };
    const pastDate: NgbDateStruct = { year: 2023, month: 10, day: 14 };
    expect(component.isDisabled(today)).toBeFalse();
    expect(component.isDisabled(pastDate)).toBeTrue();
  });

  it('should save changes and dispatch action', () => {
    spyOn(component.store, 'dispatch');
    component.courses = [{ id: 1, name: 'Course 1', domain: 'Domain 1', description: 'Description 1', deadline: '' }];
    component.deadlineCourse = '1_0';
    component.deadlineDate = '2024-10-14';
    component.onSaveChanges();
    expect(component.store.dispatch).toHaveBeenCalledWith(new SetUpdatedCourses(component.courses));
  });
});
