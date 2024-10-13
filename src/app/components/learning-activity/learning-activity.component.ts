import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ICourse } from '../../../store/lms-dashboard-state.model';
import { LmsDashboardService } from '../../../service/lms-dashboard.service';

@Component({
  selector: 'feature-learning-activity',
  templateUrl: './learning-activity.component.html',
  styleUrl: './learning-activity.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningActivityComponent implements OnInit, OnChanges {
  @Input()
  courses!: ICourse[];

  @Input()
  selectedCourseDetails!: {
    hoursPerWeek: number;
    certificate: string;
    deadline: string;
  } | null;

  overAllProgress: number = 0;

  certificates!: ICourse[];

  inProgress!: ICourse[];

  @ViewChild('learning') learning!: ElementRef;

  constructor(
    private lmsService: LmsDashboardService,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.checkOverAllProgress();
    this.certificates = this.courses.filter(
      (course) => course.status.toLocaleLowerCase() === 'completed',
    );

    this.inProgress = this.courses.filter(
      (course) => course.status.toLocaleLowerCase() === 'enrolled/inprogress',
    );
  }

  checkOverAllProgress() {
    const totalProgress = this.courses.reduce(
      (sum, course) => sum + course.progress,
      0,
    );
    this.overAllProgress = Number(
      (totalProgress / this.courses.length).toFixed(2),
    );
  }

  downloadCertificate(certificate: string) {
    this.lmsService.downloadCertificate(certificate).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = certificate;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes &&
      changes['selectedCourseDetails'] &&
      changes['selectedCourseDetails'].currentValue
    ) {
      setTimeout(() => {
        this.learning.nativeElement.focus();
      }, 200);
    } else if (changes && changes['courses'].currentValue) {
      this.certificates = [];
      this.certificates = this.courses.filter(
        (course) => course.status.toLocaleLowerCase() === 'completed',
      );

      this.inProgress = [];

      this.inProgress = this.courses.filter(
        (course) => course.status.toLocaleLowerCase() === 'enrolled/inprogress',
      );
    }
  }
}
