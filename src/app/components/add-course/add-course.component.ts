import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'feature-add-course',
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss'
})
export class AddCourseComponent implements OnInit {

  @ViewChild('addCourseModal')
  addCourseModal!: ElementRef;

  @Input()
  modalEvent!: Observable<string>;

  destroy$ = new Subject<boolean>();

  private modalInstance!: Modal;

  ngOnInit(): void {
    this.modalEvent.pipe(takeUntil(this.destroy$)).subscribe(event =>{
      this._subcribetoEvent(event);
    });
  }

  _subcribetoEvent(event: string){
    if(event === 'openModal'){
      this.modalInstance = new Modal(this.addCourseModal.nativeElement);
      this.modalInstance.show();
    }
  }
 }
