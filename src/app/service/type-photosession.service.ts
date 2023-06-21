import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypePhotosession } from '../models/type-photosession';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class TypePhotosessionService {
  private type_photosessionUrl = 'http://localhost:3000/type-photosession';

  constructor(private http: HttpClient) {}

  getPhotosessions(): Observable<TypePhotosession[]> {
    return this.http.get<TypePhotosession[]>(this.type_photosessionUrl);
  }
}
