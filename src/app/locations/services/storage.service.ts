import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Position } from "../interfaces/position";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  private localServer = "http://localhost:3000/locations/";

  constructor(private http: HttpClient) {}

  // Favorites CRUD
  getFavorites(): Observable<Position[]> {
    return this.http.get<Position[]>(this.localServer);
  }
  getFavoriteById(payload: number): Observable<Position> {
    return this.http.get<Position>(this.localServer + payload);
  }
  createFavorite(payload: Position): Observable<Position> {
    return this.http.post<Position>(this.localServer, payload);
  }
  updateFavorite(favorite: Position): Observable<Position> {
    return this.http.patch<Position>(this.localServer + favorite.id, favorite);
  }
  deleteFavorite(payload: number) {
    return this.http.delete(this.localServer + payload);
  }
}
