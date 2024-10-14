import { createSelector } from '@ngrx/store';
import { ILmsDashboardSelectState } from './lms-dashboard-state.model';

const lmsDashboardSelectFeature = (state: ILmsDashboardSelectState) =>
  state.lmsDashboard;

//selector for fetching the courses
export const courseSelector = createSelector(
  lmsDashboardSelectFeature,
  (state) => state.courses,
);

//selector for fetching the totalCourses available from the course list
export const totalCourseSelector = createSelector(
  lmsDashboardSelectFeature,
  (state) => state.totalCourses,
);

//selector for fetching the last refresh updated
export const lastUpdateSelector = createSelector(
  lmsDashboardSelectFeature,
  (state) => state.lastUpdated,
);
