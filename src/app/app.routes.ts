import { Routes } from '@angular/router';
import {DetailsHousesComponent} from "./components/details-houses/details-houses.component";
import {HomeComponent} from "./components/home/home.component";
import {MapComponent} from "./components/map/map.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page'
  },
  {
    path: 'house/:houseId',
    component: DetailsHousesComponent,
    title: 'Details House'
  },
  {
    path: 'map/:id',
    component: MapComponent,
    title: 'Show Map'
  }
];
