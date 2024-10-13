import { Injectable } from '@angular/core';
import { ICourse } from '../store/lms-dashboard-state.model';

@Injectable({
  providedIn: 'root',
})
export class GoalRiskService {
  checkRisk(courses: ICourse): boolean {
    let totalHoursNeeded = 0;

    const now = new Date();
    const deadline = new Date(courses.deadline);

    const remainingDays =
      (deadline.getTime() - now.getTime()) / (1000 * 3600 * 24);
    const remainingContent = 100 - courses.progress;
    totalHoursNeeded += (remainingContent / remainingDays) * 7;

    //Assuming 40 hours per week is feasible
    return totalHoursNeeded > 40;
  }
}
