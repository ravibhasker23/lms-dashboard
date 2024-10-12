import { Component, OnInit } from '@angular/core';
import { ILmsDashboardState } from '../store/lms-dashboard-state.model';
import { Store } from '@ngrx/store';
import { courseSelector, FetchInitCourses } from '../store';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'lms-dashboard';

  notifications = true;

  currentDate = new Date();

  courses$ = this.store.select(courseSelector as any);

  modalEvent: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private store: Store<ILmsDashboardState>) {}

  ngOnInit(): void {
    this.store.dispatch(new FetchInitCourses());
  }

  addNewCourse(){
    this.modalEvent.next('openModal');
  }
}
