import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Client } from '../models/client';
import { Observable } from 'rxjs';
import { Specialist } from '../models/specialist';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

// @ts-ignore
@Injectable({
  providedIn: 'root',
})
export class RegisterSpecialistService {
  private registerSpecialistUrl = 'http://localhost:3000/register-specialist';
  constructor(private http: HttpClient, public router: Router) {}
  registerSpecialist(specialist: Specialist): Observable<Specialist> {
    return this.http.post<Specialist>(
      this.registerSpecialistUrl,
      specialist,
      httpOptions
    );
  }
}
