import { ActionTypes } from './lms-dashboard.actions';
import { IAction, ILmsDashboardState } from './lms-dashboard-state.model';

export const initState: ILmsDashboardState = {
  loading: false,
  error: null,
  courses: null
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
      };
    }
    case ActionTypes.FETCH_INIT_COURSES_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        courses: action.payload.courses
      };
    }
    case ActionTypes.FETCH_INIT_COURSES_ERROR: {
      state = initState;
      return {
        ...state,
        loading: false,
        error: action.payload,
        courses: [],
      };
    }
    default:
      return state;
  }
}
