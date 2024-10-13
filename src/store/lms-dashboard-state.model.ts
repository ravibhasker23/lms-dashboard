import { Action } from '@ngrx/store';

//initial response
export interface ICourseResponse {
  courses: ICourse[];
  lastUpdated: string;
  totalCourses: ITotalCourses[];
}

export interface ICourse {
  id: number;
  name: string;
  progress: number;
  deadline: string;
  status: string;
  certificate: string;
  domain: string;
  description: string;
  goalRisk: boolean;
}

export interface ITotalCourses {
  id: number;
  name: string;
  domain: string;
  description: string;
}

export interface ILmsDashboardSelectState {
  lmsDashboard: ILmsDashboardState;
}

//complete state
export interface ILmsDashboardState {
  loading: boolean;
  error: IError | null;
  courses: ICourse[] | null;
  totalCourses: ITotalCourses[] | null;
  lastUpdated: string;
}

//error handling interface
export interface IError {
  errorMsg: string;
  errorCode: string;
}

export interface IAction extends Action {
  payload?: any;
}
