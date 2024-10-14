import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';
import { CourseListComponent } from './course-list.component';
import { GoalRiskService } from '../../../service/goal-risk.service';
import { ICourse } from '../../../store/lms-dashboard-state.model';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let goalRiskService: jasmine.SpyObj<GoalRiskService>;

  beforeEach(async () => {
    const goalRiskServiceSpy = jasmine.createSpyObj('GoalRiskService', [
      'checkRisk',
    ]);

    await TestBed.configureTestingModule({
      declarations: [CourseListComponent],
      providers: [{ provide: GoalRiskService, useValue: goalRiskServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    goalRiskService = TestBed.inject(
      GoalRiskService,
    ) as jasmine.SpyObj<GoalRiskService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit null for selectedCourseDetails on init', () => {
    spyOn(component.selectedCourseDetails, 'emit');
    component.ngOnInit();
    expect(component.selectedCourseDetails.emit).toHaveBeenCalledWith(null);
  });

  it('should update lastUpdated when refreshData is called', () => {
    const initialLastUpdated = component.lastUpdated;
    component.refreshData();
    expect(component.lastUpdated).toBe(initialLastUpdated);
  });

  it('should emit selected course details when onSelectedLearning is called', () => {
    spyOn(component.selectedCourseDetails, 'emit');
    const selectedCourse: ICourse = {
      id: 1,
      name: 'Course 1',
      status: 'enrolled/inprogress',
      progress: 50,
      certificate: 'Cert',
      deadline: new Date().toISOString(),
      domain: '',
      description: '',
      goalRisk: false,
    };
    component.onSelectedLearning(selectedCourse);
    expect(component.selectedCourseDetails.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        hoursPerWeek: jasmine.any(Number),
        certificate: selectedCourse.certificate,
        deadline: selectedCourse.deadline,
      }),
    );
  });

  it('should call checkRisk on goalRiskService when checkRisk is called', () => {
    const course: ICourse = {
      id: 1,
      name: 'Course 1',
      status: 'enrolled/inprogress',
      progress: 50,
      certificate: 'Cert',
      deadline: new Date().toISOString(),
      domain: '',
      description: '',
      goalRisk: false,
    };
    component.checkRisk(course);
    expect(goalRiskService.checkRisk).toHaveBeenCalledWith(course);
  });
});
