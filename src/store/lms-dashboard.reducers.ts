import { ActionTypes } from './lms-dashboard.actions';
import { IAction, ILmsDashboardState } from './lms-dashboard-state.model';

export const initState: ILmsDashboardState = {
  loading: false,
  error: null,
  courses: null,
  totalCourses: null,
  lastUpdated: '',
};

export function LmsDashboardReducer(
  state = initState,
  action: IAction,
): ILmsDashboardState {
  switch (action.type) {
    case ActionTypes.FETCH_INIT_COURSES: {
      state = initState;
      return {
        ...state,
        loading: true,
        error: null,
        courses: null,
        totalCourses: null,
      };
    }
    case ActionTypes.FETCH_INIT_COURSES_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        courses: action.payload.courses,
        totalCourses: action.payload.totalCourses,
        lastUpdated: action.payload.lastUpdated,
      };
    }
    case ActionTypes.FETCH_INIT_COURSES_ERROR: {
      state = initState;
      return {
        ...state,
        loading: false,
        error: action.payload,
        courses: [],
        totalCourses: [],
      };
    }
    case ActionTypes.SET_UPDATED_COURSES: {
      return {
        ...state,
        courses: action.payload,
      };
    }
    case ActionTypes.REFRESH_LAST_UPDATED: {
      return {
        ...state,
        lastUpdated: action.payload,
      };
    }
    default:
      return state;
  }
}
