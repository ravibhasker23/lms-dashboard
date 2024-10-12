import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, map, throwError } from 'rxjs';
import { ICourseResponse } from '../store/lms-dashboard-state.model';

@Injectable({
  providedIn: 'root',
})
export class LmsDashboardService {
  path = 'http://localhost:3000/api/courses';

  constructor(private httpClient: HttpClient) {}

  // Service to fetch the questionnaire
  public fetchCourses(): Observable<ICourseResponse> {
    return this.httpClient.get(this.path, {}).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // A client-side or network error occurred.
          console.error('An error occurred:', error.error.message);
        } else {
          // A server-sider error occured
          console.error(
            `Backend returned code ${error.status}, body was: ${error.error}`,
          );
        }
        return throwError(error);
      }),
    );
  }
}
