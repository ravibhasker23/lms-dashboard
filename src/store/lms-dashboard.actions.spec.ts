import {
  IAnswers,
  IError,
  IQuestionResponse,
} from './lms-dashboard-state.model';
import * as questionnaireActions from './lms-dashboard.actions';

describe('FetchInitialQuestionnaire', () => {
  it('should initite the questionnaire', () => {
    const action = new questionnaireActions.FetchInitialQuestionnaire();
    expect(action.type).toBe(
      questionnaireActions.ActionTypes.FETCH_INIT_QUESTIONNAIRE,
    );
  });
});

describe('FetchInitialQuestionnaireSuccess', () => {
  it('should call success when effect is complete', () => {
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
    const action = new questionnaireActions.FetchInitialQuestionnaireSuccess(
      payload,
    );
    expect(action.type).toBe(
      questionnaireActions.ActionTypes.FETCH_INIT_QUESTIONNAIRE_SUCCESS,
      payload,
    );

    expect(action.payload).toEqual(payload);
  });
});

describe('FetchInitialQuestionnaireError', () => {
  it('should call error when effect has error', () => {
    const payload: IError = {
      errorMsg: '',
      errorCode: '',
    };
    const action = new questionnaireActions.FetchInitialQuestionnaireError(
      payload,
    );
    expect(action.type).toBe(
      questionnaireActions.ActionTypes.FETCH_INIT_QUESTIONNAIRE_ERROR,
      payload,
    );

    expect(action.payload).toEqual(payload);
  });
});

describe('SetAnswers', () => {
  it('should call SetAnswers for storing user inputs', () => {
    const payload: IAnswers[] = [];
    const action = new questionnaireActions.SetAnswers(payload);
    expect(action.type).toBe(
      questionnaireActions.ActionTypes.SET_ANSWERS,
      payload,
    );

    expect(action.payload).toEqual(payload);
  });
});
