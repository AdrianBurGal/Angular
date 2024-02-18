import {Component} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {HouseComponent} from "./components/house/house.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./components/header/header.component";
import {HomeComponent} from "./components/home/home.component";
import {DetailsHousesComponent} from "./components/details-houses/details-houses.component";
import {MapComponent} from "./components/map/map.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    HeaderComponent,
    HomeComponent,
    HouseComponent,
    NgForOf,
    RouterOutlet,
    RouterLink,
    DetailsHousesComponent,
    MapComponent
  ],
  template: `
    <main>
      <app-header/>
      <section class="content">
        <router-outlet/>
      </section>
    </main>
  `,
  styles: ''
})
export class AppComponent {

}
