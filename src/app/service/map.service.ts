import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from "rxjs";
import {House} from "../models/house";
import {Injectable} from "@angular/core";
import * as L from "leaflet";

@Injectable({
  providedIn: 'root',
})
export class MapService {

  map: L.Map | undefined;

  constructor() {
  }

  showLocation(latitude: number, longitude: number) {
    this.deleteMap();
    this.map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    L.marker([latitude, longitude]).addTo(this.map)
      .bindPopup('Current house location')
      .openPopup();
  }

  showYourCurrentLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      this.showLocation(position.coords.latitude, position.coords.longitude);
    })
  }

  deleteMap() {
    this.map?.remove()
  }

}


