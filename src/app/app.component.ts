import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ILmsDashboardState } from '../store/lms-dashboard-state.model';
import { Store } from '@ngrx/store';
import {
  courseSelector,
  FetchInitCourses,
  lastUpdateSelector,
  RefreshLastUpdated,
  totalCourseSelector,
} from '../store';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'Learning Management Dashboard';

  notifications = true;

  currentDate = new Date();

  courses$ = this.store.select(courseSelector as any);

  totalCourses$ = this.store.select(totalCourseSelector as any);

  modalEvent: BehaviorSubject<string> = new BehaviorSubject<string>('');

  lastUpdated$ = this.store.select(lastUpdateSelector as any);

  selectedCourseDetails!: {
    hoursPerWeek: number;
    certificate: string;
    deadline: string;
  } | null;

  refreshCheck = false;

  loading: boolean | null = false;

  constructor(private store: Store<ILmsDashboardState>) {}

  // Dispatches an action to fetch initial list of courses for the user
  ngOnInit(): void {
    this.store.dispatch(new FetchInitCourses());
    this.loading = false;
  }

  //modal event passed as an subject to add-course modal for showing the modal
  addNewCourse() {
    this.modalEvent.next('openModal');
  }

  //Updates the learning details in the learning activity section
  onSelectedDeatils(
    selectedDetails: {
      hoursPerWeek: number;
      certificate: string;
      deadline: string;
    } | null,
  ) {
    this.selectedCourseDetails = selectedDetails;
  }

  refreshLastUpdated() {
    this.refreshCheck = true;
    setTimeout(() => {
      const lastUpdated = new Date().toLocaleString();
      this.store.dispatch(new RefreshLastUpdated(lastUpdated));
      this.refreshCheck = false;
    }, 400);
  }

  onRecheck(event: boolean) {
    if (event) {
      this.selectedCourseDetails = null;
    }
  }
}
