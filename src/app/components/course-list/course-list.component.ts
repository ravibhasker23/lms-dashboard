import { Component, Input, OnInit } from '@angular/core';
import { ICourse } from '../../../store/lms-dashboard-state.model';

@Component({
  selector: 'feature-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent implements OnInit {

  @Input()
  courses!: ICourse[] | null;

  ngOnInit(): void {
    console.log(this.courses);
  }
}
