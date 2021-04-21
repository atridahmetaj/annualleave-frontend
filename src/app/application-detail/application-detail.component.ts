import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { ActivatedRoute, Router } from '@angular/router';

const baseUrl = 'http://localhost:4200/profile/';
@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.css']
})
export class ApplicationDetailComponent implements OnInit {

  currentApplication = null;
  message = '';


  applicationType = [
    {id: "DAYOFF", name: "Day off"},
    {id: "VACATIONS", name: "Vacations"},
    {id: "COMPENSATION", name: "Compensation"}
  ];
  selectedValue = null;

  constructor(
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getApplication(this.route.snapshot.paramMap.get('id'));
  }

  getApplication(id): void {
    this.applicationService.get(id)
      .subscribe(
        data => {
          this.currentApplication = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status): void {
    const data = {
      title: this.currentApplication.title,
      description: this.currentApplication.description,
      published: status
    };

    this.applicationService.update(this.currentApplication.id, data)
      .subscribe(
        response => {
          this.currentApplication.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateApplication(): void {
    this.applicationService.update(this.currentApplication.id, this.currentApplication)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The application was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteApplication(): void {
    this.applicationService.delete(this.currentApplication.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate([`${baseUrl}${localStorage.id}`+"/applications"]);
        },
        error => {
          console.log(error);
        });
  }

  onChange() {
    console.log(this.selectedValue)
  }
}
