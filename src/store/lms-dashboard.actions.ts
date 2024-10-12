import {
  IAction,
  ICourseResponse,
  IError,
} from './lms-dashboard-state.model';

export enum ActionTypes {
  FETCH_INIT_COURSES = '[LMSDASHBOARD] Fetch init courses',
  FETCH_INIT_COURSES_SUCCESS = '[LMSDASHBOARD] Fetch init courses success',
  FETCH_INIT_COURSES_ERROR = '[LMSDASHBOARD] Fetch init courses error',
}

export class FetchInitCourses implements IAction {
  readonly type: ActionTypes = ActionTypes.FETCH_INIT_COURSES;
}

export class FetchInitCoursesSuccess implements IAction {
  readonly type: ActionTypes = ActionTypes.FETCH_INIT_COURSES_SUCCESS;
  constructor(public payload: ICourseResponse) {}
}

export class FetchInitCoursesError implements IAction {
  readonly type: ActionTypes = ActionTypes.FETCH_INIT_COURSES_ERROR;
  constructor(public payload: IError) {}
}
