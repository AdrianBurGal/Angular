import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from "rxjs";
import {House} from "../models/house";

@Injectable({
  providedIn: 'root',
})
export class HouseService {

  houses: Observable<House[]>;

  constructor(private http: HttpClient) {
    this.houses = this.http.get<House[]>(`assets/houses.json`);
  }

  getListHouses(): Observable<House[]> {
    return this.houses;
  }

  getHouseById(id: number): Observable<House | undefined> {
    return this.getListHouses().pipe(
      map(houses => houses.find(house => house.id === id))
    );
  }

  applyValoration(newHouse: House, satisfaction: number) {
    this.houses.subscribe(houses => {
      houses.forEach(house => {
        if (house.id === newHouse.id) {
          house.satisfaction = satisfaction;
          this.houses = of(houses);
        }
      })
    })
  }

}
