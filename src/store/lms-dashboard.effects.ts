import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  ActionTypes,
  FetchInitCoursesError,
  FetchInitCoursesSuccess,
} from './lms-dashboard.actions';
import { Action } from '@ngrx/store';
import { ICourseResponse } from './lms-dashboard-state.model';
import { LmsDashboardService } from '../service/lms-dashboard.service';

@Injectable()
export class LmsDashboardEffects {
  constructor(
    private actions$: Actions<Action>,
    private _lmsDashboardService: LmsDashboardService,
  ) {}

  public fetchInitQuestionnaire$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.FETCH_INIT_COURSES),
      mergeMap(() => {
        return this._lmsDashboardService.fetchCourses().pipe(
          map((response: ICourseResponse) => {
            return new FetchInitCoursesSuccess(response);
          }),
          catchError((error) => of(new FetchInitCoursesError(error))),
        );
      }),
    );
  });
}
