import {Component, OnInit} from '@angular/core';
import {ApplicationService} from 'src/app/services/application.service';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.css']
})
export class AddApplicationComponent implements OnInit {
  application = {
    from: '',
    to: '',
    userId: '',
    applicationType: '',
  };
  submitted = false;
  applicationType = [
    {id: "DAYOFF", name: "Day off"},
    {id: "VACATIONS", name: "Vacations"},
    {id: "COMPENSATION", name: "Compensation"}
  ];
  selectedValue = null;

  constructor(private applicationService: ApplicationService) {
  }

  ngOnInit() {
  }

  saveApplication(): void {
    const data = {
      from: this.application.from,
      to: this.application.to,
      applicationType: this.selectedValue,
      userId: localStorage.getItem("id")
    };
    this.applicationService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          alert(error.error);
        });
  }
  newApplication(): void {
    this.submitted = false;
    this.application = {
      from: '',
      to: '',
      userId: '',
      applicationType: '',
    };
  }


  onChange() {
    console.log(this.selectedValue)
  }
}
