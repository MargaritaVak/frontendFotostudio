import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Location } from '../models/location';
import { Specialization } from '../models/specialization';
import { Specialist } from '../models/specialist';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
// @ts-ignore
@Injectable({
  providedIn: 'root',
})
export class SpecializationsService {
  private specializationsUrl = 'http://localhost:3000/specializations'; // URL to web api
  private specializationByIdUrl =
    'http://localhost:3000/specialization-specialist';
  private specializationAddUrl = 'http://localhost:3000/add-specialization';

  constructor(private http: HttpClient) {}

  getSpecializations(): Observable<Specialization[]> {
    return this.http.get<Specialization[]>(this.specializationsUrl);
  }

  getSpecializationById(id_spec: any): Observable<Specialist[]> {
    if (id_spec !== undefined) {
      const url = `${this.specializationByIdUrl}/${id_spec}`;
      return this.http.get<Specialist[]>(url);
    }
    return of([]);
  }

  addSpecialization(name: string): Observable<any> {
    return this.http.post<any>(
      this.specializationAddUrl,
      { name },
      httpOptions
    );
  }
}
