# Learninig Dashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

- Initially loads the list of courses user has already enrolled/In progress and completed by fetching the data from `http://localhost:3000/api/courses`
- `Customize your learning journey` helps user to add/remove a course and add a deadline or update a deadline of existing course and save changes. If the user updates the deadline of the course which will be at risk of getting completed, a notification `Risk of missing goal` will be shown for that selected course.
- `Refresh` refreshes the last updated timestamp with the current and refreshes the courses to initial
- `See learning details` will show the estimated hours the user needs to complete the selected course
- `Continue learning` is a mock button which has no action.
- `Overview` section shows the overall progress of the enrolled/In progress and completed courses.
- `My certificates` section shows the user certificates available for downloading for the completed courses. It posts a request to `assets/cert_name` and downloads the certificate.

Below are the details on the packages used.

- `bootstrap` for styling/layout, other components and `ng-bootstrap` for datepicker component.
- `NgRx` for state management, managing global state across an entire application.
- `json-server` for providing mock REST API calls and `nodemon` for automatically detecting any changes in directory are made.
- `prettier` used for prettifying the code base

## Development server

Run `npm install` to install all the dependencies.
Run `npm start` for the dev server. It will start both `ng serve` and `npm run mock:server`. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Backend mock server

On running `npm start`, mock server will also be started. Navigate to `http://localhost:3000/`. Once the build is complete and json-server has started to view the mock json created for the courses list. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
