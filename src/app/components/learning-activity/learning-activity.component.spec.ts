import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { of } from 'rxjs';
import { LearningActivityComponent } from './learning-activity.component';
import { LmsDashboardService } from '../../../service/lms-dashboard.service';
import { ICourse } from '../../../store/lms-dashboard-state.model';

describe('LearningActivityComponent', () => {
  let component: LearningActivityComponent;
  let fixture: ComponentFixture<LearningActivityComponent>;
  let lmsService: jasmine.SpyObj<LmsDashboardService>;

  beforeEach(async () => {
    const lmsServiceSpy = jasmine.createSpyObj('LmsDashboardService', ['downloadCertificate']);

    await TestBed.configureTestingModule({
      declarations: [LearningActivityComponent],
      providers: [
        { provide: LmsDashboardService, useValue: lmsServiceSpy },
        ChangeDetectorRef
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LearningActivityComponent);
    component = fixture.componentInstance;
    lmsService = TestBed.inject(LmsDashboardService) as jasmine.SpyObj<LmsDashboardService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should filter courses into certificates and inProgress on init', () => {
    const courses: ICourse[] = [
      { id: 1, name: 'Course 1', status: 'completed', progress: 100 },
      { id: 2, name: 'Course 2', status: 'enrolled/inprogress', progress: 50 }
    ];
    component.courses = courses;
    component.ngOnInit();
    expect(component.certificates.length).toBe(1);
    expect(component.inProgress.length).toBe(1);
  });

  it('should calculate overall progress correctly', () => {
    const courses: ICourse[] = [
      { id: 1, name: 'Course 1', status: 'completed', progress: 100 },
      { id: 2, name: 'Course 2', status: 'enrolled/inprogress', progress: 50 }
    ];
    component.courses = courses;
    component.checkOverAllProgress();
    expect(component.overAllProgress).toBe(75);
  });

  it('should download certificate when downloadCertificate is called', () => {
    const blob = new Blob(['certificate content'], { type: 'application/pdf' });
    lmsService.downloadCertificate.and.returnValue(of(blob));

    spyOn(window.URL, 'createObjectURL').and.returnValue('blob:url');
    const a = document.createElement('a');
    spyOn(document, 'createElement').and.returnValue(a);
    spyOn(document.body, 'appendChild');
    spyOn(document.body, 'removeChild');
    spyOn(a, 'click');

    component.downloadCertificate('certificate.pdf');

    expect(lmsService.downloadCertificate).toHaveBeenCalledWith('certificate.pdf');
    expect(window.URL.createObjectURL).toHaveBeenCalledWith(blob);
    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(a.href).toBe('blob:url');
    expect(a.download).toBe('certificate.pdf');
    expect(document.body.appendChild).toHaveBeenCalledWith(a);
    expect(a.click).toHaveBeenCalled();
    expect(document.body.removeChild).toHaveBeenCalledWith(a);
  });
});
