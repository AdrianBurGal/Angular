import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  constructor(private http: HttpClient) {
  }

  getWeatherLocation(name: string) {
    return this.http.get("https://api.weatherapi.com/v1/current.json?key=390c39dadb8a406d927143811241602&q=" + name + "&aqi=yes");
  }

}
