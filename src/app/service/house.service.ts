import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {House} from "../models/house";

@Injectable({
  providedIn: 'root',
})
export class HouseService {

  constructor(private http: HttpClient) {
  }

  getListHouses(): Observable<House[]> {
    return this.http.get<House[]>(`assets/houses.json`);
  }

  getHouseById(id: number): Observable<House | undefined> {
    return this.getListHouses().pipe(
      map(houses => houses.find(house => house.id === id))
    );
  }

}
