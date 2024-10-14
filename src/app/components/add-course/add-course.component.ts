import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Modal } from 'bootstrap';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
  ICourse,
  ILmsDashboardState,
  ITotalCourses,
} from '../../../store/lms-dashboard-state.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { SetUpdatedCourses } from '../../../store';

@Component({
  selector: 'feature-add-course',
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss',
})
export class AddCourseComponent implements OnInit {
  @ViewChild('addCourseModal')
  addCourseModal!: ElementRef;

  @Input()
  modalEvent!: Observable<string>;

  destroy$ = new Subject<boolean>();

  private modalInstance!: Modal;

  lastStoredCourses!: ICourse[];

  @Input()
  courses!: ICourse[];

  @Input()
  totalCourses!: ITotalCourses[];

  date = new Date();

  today!: NgbDateStruct;

  courseBlock = false;

  selectedValue = '';

  exists = false;

  deadlineCourse = '';

  selectedDate: string | null = '';

  deadlineDate = '';

  addDeadlineErr = false;

  @Output()
  riskEvent = new EventEmitter<boolean>();

  constructor(private store: Store<ILmsDashboardState>) {}

  ngOnInit(): void {
    this.modalEvent.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      this._subcribeToEvent(event);
    });

    const currentDate = new Date();
    this.today = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate(),
    };

    this.deadlineCourse = '';
  }

  isDisabled = (date: NgbDateStruct) => {
    const today = new Date();

    const dateToCheck = new Date(date.year, date.month - 1, date.day);
    return dateToCheck < today;
  };

  _subcribeToEvent(event: string) {
    if (event === 'openModal') {
      this.modalInstance = new Modal(this.addCourseModal.nativeElement);
      this.modalInstance.show();
      this.selectedValue = '';
      this.exists = false;
      this.deadlineCourse = '';
      this.selectedDate = null;
      this.lastStoredCourses = this.courses;
    }
  }

  toggleCourseBlock() {
    this.courseBlock = !this.courseBlock;
    this.exists = false;
    this.selectedValue = '';
  }

  addNewCourse(event: any) {
    const value = event.target.value;
    const id = Number(value.split('_')[0]);
    const idx = value.split('_')[1];
    const index = this.courses?.findIndex((c) => c.id === id);
    if (index === -1) {
      this.selectedDate = '';
      this.exists = false;
      const course = {
        id: this.totalCourses[idx].id,
        name: this.totalCourses[idx].name,
        progress: 0,
        deadline: '',
        status: 'Enrolled/Inprogress',
        certificate: 'N/A',
        domain: this.totalCourses[idx].domain,
        description: this.totalCourses[idx].description,
        goalRisk: false,
      };
      this.courses = [...this.courses, course];
      this.courseBlock = !this.courseBlock;
      this.selectedValue = '';
      this.selectedDate = '';
    } else {
      this.exists = true;
    }
  }

  removeCourse(courseId: number) {
    this.courses = this.courses.filter((course) => course.id !== courseId);
  }

  onDateChange(date: NgbDateStruct) {
    const year = date.year;
    const month = date.month < 10 ? `${date.month}` : date.month;
    const day = date.day < 10 ? `${date.day}` : date.day;

    this.deadlineDate = `${year}-${month}-${day}`;
  }

  onSaveChanges() {
    const idx = Number(this.deadlineCourse.split('_')[1]);

    let updateArr = this.courses.map((item, index) => {
      if (index === idx) {
        return { ...item, deadline: this.deadlineDate };
      }
      return item;
    });

    this.courses = updateArr;
    this.selectedDate = '';
    this.store.dispatch(new SetUpdatedCourses(this.courses));
    this.modalInstance.hide();
    this.riskEvent.emit(true);
  }

  checkForChange() {
    return (
      JSON.stringify(this.lastStoredCourses) !== JSON.stringify(this.courses)
    );
  }

  dismiss() {
    this.deadlineCourse = '';
    this.selectedDate = '';
    this.selectedValue = '';

    this.modalInstance.hide();
    this.riskEvent.emit(true);
  }
}
