import { Action } from '@ngrx/store';

//initial response
export interface ICourseResponse {
  courses: ICourse[];
}

export interface ICourse{
  id: string;
  name: string;
  progress: string;
  deadline: string;
  hours_per_week: number;
  status: string;
  certificate: string;
  domain: string;
  description: string;
}

export interface ILmsDashboardSelectState{
  lmsDashboard: ILmsDashboardState
}

//complete state
export interface ILmsDashboardState {
  loading: boolean;
  error: IError | null;
  courses: ICourse[] | null;
}

//error handling interface
export interface IError {
  errorMsg: string;
  errorCode: string;
}

export interface IAction extends Action {
  payload?: any;
}
