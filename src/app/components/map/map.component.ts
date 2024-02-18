import {Component, inject, OnInit} from '@angular/core';
import {House} from "../../models/house";
import {HouseService} from "../../service/house.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MapService} from "../../service/map.service";
import {WeatherService} from "../../service/weather.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {Weather} from "../../models/weather";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe
  ],
  templateUrl: 'map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  houseService = inject(HouseService);
  mapService = inject(MapService);
  weatherService = inject(WeatherService);
  house: Observable<House | undefined>;
  weather: Weather = {name: '', localtime: '', urlIcon: '', text: '', temperature: 0};

  constructor() {
    const houseId = Number(this.route.snapshot.params['id']);
    this.house = this.houseService.getHouseById(houseId);
    this.getWeatherLocation();
  }

  ngOnInit(): void {
    this.showLocation();
  }

  showLocation() {
    this.house.subscribe(house => {
      if (house) {
        this.mapService.showLocation(house.latitude, house.longitude);
      }
    });
  }

  showCurrentLocation() {
    this.mapService.showYourCurrentLocation();
  }

  getWeatherLocation() {
    this.house.subscribe(house => {
      if (house) {
        this.weatherService.getWeatherLocation(house.city).subscribe(weather => {
          if (weather) {
            this.weather.name = Object.values(weather)[0].name;
            this.weather.localtime = Object.values(weather)[0].localtime;
            this.weather.text = Object.values(weather)[1].condition.text;
            this.weather.urlIcon = Object.values(weather)[1].condition.icon;
            this.weather.temperature = Object.values(weather)[1].feelslike_c;
          }
        });
      }
    });
  }
}
