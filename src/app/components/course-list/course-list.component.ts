import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICourse } from '../../../store/lms-dashboard-state.model';
import { GoalRiskService } from '../../../service/goal-risk.service';

@Component({
  selector: 'feature-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
})
export class CourseListComponent implements OnInit {
  @Input()
  courses!: ICourse[] | null;

  lastUpdated: string = new Date().toLocaleString();

  @Output()
  selectedCourseDetails = new EventEmitter<{
    hoursPerWeek: number;
    certificate: string;
    deadline: string;
  } | null>();

  constructor(private goalRiskService: GoalRiskService) {}

  ngOnInit(): void {
    this.selectedCourseDetails.emit(null);
  }

  // Updates learning activity section and estimates the hours per week required based on the progress and remaining days.
  // Emits the selected details
  onSelectedLearning(selectedCourse: ICourse) {
    const now = new Date();

    const deadline = new Date(selectedCourse.deadline);
    const remainingDays =
      (deadline.getTime() - now.getTime()) / (1000 * 3600 * 24);
    const remainingContent = 100 - selectedCourse.progress;
    const hrsPerWeek = Number(
      ((remainingContent / remainingDays) * 7).toFixed(1),
    );

    this.selectedCourseDetails.emit({
      hoursPerWeek: hrsPerWeek,
      certificate: selectedCourse.certificate,
      deadline: selectedCourse.deadline,
    });
  }

  //Checks risk after every update of deadline date for an existing course or newly added course. Assumption is 40 hours per week is feasible.
  checkRisk(course: ICourse) {
    return this.goalRiskService.checkRisk(course);
  }
}
