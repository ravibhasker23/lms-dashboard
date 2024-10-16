import {
  IAction,
  ICourse,
  ICourseResponse,
  IError,
} from './lms-dashboard-state.model';

export enum ActionTypes {
  FETCH_INIT_COURSES = '[LMSDASHBOARD] Fetch init courses',
  FETCH_INIT_COURSES_SUCCESS = '[LMSDASHBOARD] Fetch init courses success',
  FETCH_INIT_COURSES_ERROR = '[LMSDASHBOARD] Fetch init courses error',
  SET_UPDATED_COURSES = '[LMSDASHBOARD] Set update courses',
  REFRESH_LAST_UPDATED = '[LMSDASHBOARD] Refresh last updated',
  DOWNLOAD_CERT = '[LMSDASHBOARD] Download certificate',
  DOWNLOAD_CERT_SUCCESS = '[LMSDASHBOARD] Download certificate',
  DOWNLOAD_CERT_ERROR = '[LMSDASHBOARD] Download certificate',
}

//Initial fetch for courses with a side effect for calling the service to fetch data
export class FetchInitCourses implements IAction {
  readonly type: ActionTypes = ActionTypes.FETCH_INIT_COURSES;
}

//Initial fetch for courses on success
export class FetchInitCoursesSuccess implements IAction {
  readonly type: ActionTypes = ActionTypes.FETCH_INIT_COURSES_SUCCESS;
  constructor(public payload: ICourseResponse) {}
}

//Initial fetch for courses upon error action
export class FetchInitCoursesError implements IAction {
  readonly type: ActionTypes = ActionTypes.FETCH_INIT_COURSES_ERROR;
  constructor(public payload: IError) {}
}

//Updates the courses with a new set of data
export class SetUpdatedCourses implements IAction {
  readonly type: ActionTypes = ActionTypes.SET_UPDATED_COURSES;
  constructor(public payload: ICourse[]) {}
}

//Stores the last refresh updated
export class RefreshLastUpdated implements IAction {
  readonly type: ActionTypes = ActionTypes.REFRESH_LAST_UPDATED;
  constructor(public payload: string) {}
}
