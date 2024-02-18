import {Component, Input} from '@angular/core';
import {House} from "../../models/house";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-house',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
      <section class="listing">
          <img class="listing-photo" [src]="house.photo" alt="Exterior photo of {{house.name}}">
          <h2 class="listing-heading">{{ house.name }}</h2>
          <p class="listing-location">{{ house.city}}, {{house.state }}</p>
          <a routerLink='/house/{{house.id}}'>Learn More</a>
          <a routerLink="/map/{{house.id}}">Show Location</a>
      </section>
  `,
  styleUrl: './house.component.css'
})
export class HouseComponent {
  @Input() house!: House;
}
