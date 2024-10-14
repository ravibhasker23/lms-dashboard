import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ILmsDashboardState } from '../store/lms-dashboard-state.model';
import {
  courseSelector,
  totalCourseSelector,
  lastUpdateSelector,
} from '../store/lms-dashboard.selector';
import {
  FetchInitCourses,
  RefreshLastUpdated,
} from '../store/lms-dashboard.actions';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<ILmsDashboardState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [StoreModule.forRoot({})],
      providers: [
        {
          provide: Store,
          useValue: jasmine.createSpyObj('Store', ['select', 'dispatch']),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    store.select((selector: any) => {
      switch (selector) {
        case courseSelector:
          return of([]);
        case totalCourseSelector:
          return of(0);
        case lastUpdateSelector:
          return of(new Date().toLocaleString());
        default:
          return of(null);
      }
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have title "Learning Management Dashboard"', () => {
    expect(component.title).toBe('Learning Management Dashboard');
  });

  it('should dispatch FetchInitCourses on init', () => {
    const dispatchSpy = store.dispatch as jasmine.Spy;
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(new FetchInitCourses());
  });

  it('should open modal when addNewCourse is called', () => {
    component.addNewCourse();
    component.modalEvent.subscribe((event) => {
      expect(event).toBe('openModal');
    });
  });

  it('should set selectedCourseDetails when onSelectedDeatils is called', () => {
    const details = {
      hoursPerWeek: 10,
      certificate: 'Cert',
      deadline: '2024-12-31',
    };
    component.onSelectedDeatils(details);
    expect(component.selectedCourseDetails).toEqual(details);
  });

  it('should refresh last updated and dispatch actions when refreshLastUpdated is called', fakeAsync(() => {
    const dispatchSpy = store.dispatch as jasmine.Spy;
    component.refreshLastUpdated();
    expect(component.refreshCheck).toBeTrue();
    tick(400);
    expect(dispatchSpy).toHaveBeenCalledWith(jasmine.any(RefreshLastUpdated));
    expect(dispatchSpy).toHaveBeenCalledWith(new FetchInitCourses());
    expect(component.refreshCheck).toBeFalse();
  }));

  it('should set selectedCourseDetails to null when onRecheck is called with true', () => {
    component.onRecheck(true);
    expect(component.selectedCourseDetails).toBeNull();
  });
});
