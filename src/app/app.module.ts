import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CourseListComponent } from './components/course-list/course-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LearningActivityComponent } from './components/learning-activity/learning-activity.component';
import { LmsDashboardEffects, LmsDashboardReducer } from '../store';
import { LmsDashboardService } from '../service/lms-dashboard.service';
import { AddCourseComponent } from './components/add-course/add-course.component';
@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    LearningActivityComponent,
    AddCourseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ lmsDashboard: LmsDashboardReducer }),
    EffectsModule.forRoot([LmsDashboardEffects]),
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
  ],
  providers: [provideAnimationsAsync(), LmsDashboardService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
