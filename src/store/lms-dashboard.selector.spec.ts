import { initState } from './lms-dashboard.reducers';
import * as questionnaireSelector from './lms-dashboard.selector';

describe('questionnaireSelector', () => {
  const state = {
    questionnaire: initState,
  };

  describe('pageSelector', () => {
    it('should return the value of page from state', () => {
      const pageSelectorState = questionnaireSelector.pageSelector(state);
      expect(pageSelectorState).toBeDefined();
    });
  });
});
