import { Component, OnInit } from '@angular/core';
import {ApplicationService} from 'src/app/services/application.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {

  applications: any;
  currentApplication = null;
  currentIndex = -1;
  type = '';

  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.retrieveApplications();
  }

  retrieveApplications(): void {
    this.applicationService.getAll(localStorage.getItem("id"))
      .subscribe(
        data => {
          this.applications = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveApplications();
    this.currentApplication = null;
    this.currentIndex = -1;
  }

  setActiveTutorial(application, index): void {
    this.currentApplication = application;
    this.currentIndex = index;
  }

  removeAllApplications(): void {
    this.applicationService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveApplications();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.applicationService.findByApplicationType(this.type)
      .subscribe(
        data => {
          this.applications = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
