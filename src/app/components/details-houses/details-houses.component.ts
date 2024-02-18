import {Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HouseService} from "../../service/house.service";
import {House} from "../../models/house";
import {Observable} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-details-house',
  standalone: true,
  imports: [AsyncPipe, NgIf, ReactiveFormsModule],
  template: `
      <article *ngIf="house | async as house">
          <img class="listing-photo" src="{{house.photo}}"
               alt="Exterior photo of {{house.name}}"/>
          <section class="listing-description">
              <h2 class="listing-heading">{{house.name}}</h2>
              <p class="listing-location">{{house.city}}, {{house.state}}</p>
          </section>
          <section class="listing-features">
              <h2 class="section-heading">About this housing location</h2>
              <ul>
                  <li>Units available: {{house.availableUnits}}</li>
                  <li>Does this location have wifi: {{house.wifi}}</li>
                  <li>Does this location have laundry: {{house.laundry}}</li>
              </ul>
          </section>

          <section class="listing-apply">
              <h2 class="section-heading">Apply now to live here</h2>
              <form [formGroup]="applyForm" (submit)="submitApplication()">
                  <label for="first-name">First Name</label>
                  <input id="first-name" type="text" formControlName="firstName" placeholder="Insert your name">
                  <span *ngIf="showError && this.applyForm.get('firstName')?.errors?.['required']">Enter name</span>

                  <label for="last-name">Last Name</label>
                  <input id="last-name" type="text" formControlName="lastName" placeholder="Insert your last name">
                  <span *ngIf="showError && this.applyForm.get('lastName')?.errors?.['required']">Enter last name</span>

                  <label for="email">Email</label>
                  <input id="email" type="email" formControlName="email" placeholder="Insert your email">
                  <span *ngIf="showError && this.applyForm.get('email')?.errors?.['pattern']">The email is not correct</span><br>

                  <button type="submit" class="primary">Apply now</button>
              </form>
          </section>
      </article>
  `,
  styleUrl: './details-houses.component.css'
})
export class DetailsHousesComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  houseService = inject(HouseService);
  house: Observable<House | undefined>;
  applyForm: FormGroup;
  showError: boolean = false;

  constructor() {
    const houseId = Number(this.route.snapshot.params['houseId']);
    this.house = this.houseService.getHouseById(houseId);
    const formData = JSON.parse(localStorage.getItem('applyFormData') || '{}');

    this.applyForm = new FormGroup({
      firstName: new FormControl(formData.firstName || '', [Validators.required]),
      lastName: new FormControl(formData.lastName || '', [Validators.required]),
      email: new FormControl(formData.email || '', [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')])
    });
  }

  submitApplication() {
    if (this.applyForm.valid) {
      localStorage.setItem('applyFormData', JSON.stringify(this.applyForm.value));
      this.showError = false;
    } else {
      this.showError = true;
    }
  }
}
