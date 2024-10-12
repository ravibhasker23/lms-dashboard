import {
  IAction,
  IError,
  IQuestionResponse,
} from './lms-dashboard-state.model';
import { ActionTypes } from './lms-dashboard.actions';
import { questionnaireReducer, initState } from './lms-dashboard.reducers';

describe('questionnaireReducer', () => {
  it('should handle FETCH_INIT_QUESTIONNAIRE action', () => {
    const fetchInitialQuestionnaire: IAction = {
      type: ActionTypes.FETCH_INIT_QUESTIONNAIRE,
    };

    const newState = questionnaireReducer(initState, fetchInitialQuestionnaire);

    expect(newState.page).toEqual(null);
    expect(newState.loading).toEqual(true);
  });

  it('should handle FETCH_INIT_QUESTIONNAIRE_SUCCESS action', () => {
    const payload: IQuestionResponse = {
      questionnaire: {
        doughnutCategory: '',
        loading: false,
        error: null,
        page: {
          controls: {
            qId: '',
            parent: false,
            label: '',
            options: [],
          },
        },
        answers: [],
      },
    };

    const fetchInitialQuestionnaireSuccess: IAction = {
      type: ActionTypes.FETCH_INIT_QUESTIONNAIRE_SUCCESS,
      payload,
    };

    const newState = questionnaireReducer(
      initState,
      fetchInitialQuestionnaireSuccess,
    );

    expect(newState.loading).toEqual(false);
  });

  it('should handle FETCH_INIT_QUESTIONNAIRE_ERROR action', () => {
    const payload: IError = {
      errorMsg: '',
      errorCode: '',
    };

    const fetchInitialQuestionnaireError: IAction = {
      type: ActionTypes.FETCH_INIT_QUESTIONNAIRE_ERROR,
      payload,
    };

    const newState = questionnaireReducer(
      initState,
      fetchInitialQuestionnaireError,
    );

    expect(newState.error).toEqual(payload);
    expect(newState.page).toEqual(null);
  });
});
