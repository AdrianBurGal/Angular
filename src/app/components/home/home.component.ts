import {Component, inject} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HouseComponent} from "../house/house.component";
import {House} from "../../models/house";
import {HouseService} from "../../service/house.service";
import {AsyncPipe, NgForOf} from "@angular/common";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, HouseComponent, NgForOf, AsyncPipe],
  template: `
    <form>
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button"
              (click)="filterResults(filter.value)">Search
      </button>
    </form>
    <section class="results">
      <app-house *ngFor="let house of filteredLocationList | async "
                 [house]="house"></app-house>
    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private houseService = inject(HouseService);
  housesList = this.houseService.getListHouses();
  filteredLocationList = this.housesList;

  constructor() {
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housesList;
      return;
    }

    this.filteredLocationList = this.housesList.pipe(map(
      houses => houses.filter(house =>
        house.city.toLowerCase().includes(text.toLowerCase()))));
  }
}
