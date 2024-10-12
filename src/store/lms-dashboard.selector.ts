
import { createSelector } from '@ngrx/store';
import { ILmsDashboardSelectState } from './lms-dashboard-state.model';

const lmsDashboardSelectFeature = (state: ILmsDashboardSelectState) => state.lmsDashboard

//selector for fetching the courses
export const courseSelector = createSelector(
  lmsDashboardSelectFeature,
  (state) => state.courses,
);
