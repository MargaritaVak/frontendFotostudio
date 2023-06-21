import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Users} from "../models/user";
import {Specialist} from "../models/specialist";
import {Client} from "../models/client";
import {Specialization} from "../models/specialization";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const httpOptions_file = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>' }),
};

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private clientUrl = 'http://localhost:3000/client-get'; // URL to web api
  private specialistUrl = 'http://localhost:3000/specialist-get';
  private specializahionUrl = 'http://localhost:3000/specialization';
  private  clientPutUrl ='http://localhost:3000/client';
  private  clientPutPhotoUrl ='http://localhost:3000/client-photo';
  private  specialistPutPhotoUrl ='http://localhost:3000/specialist-photo';
  private  specialistServicePutPhotoUrl ='http://localhost:3000/update-service-specialist';
  constructor(private http: HttpClient) {}

  getClient(id_user: string): Observable<Client> {
    const url = `${this.clientUrl}/${id_user}`;
    return this.http.get<Client>(url);
  }

  getSpecialist(id_user: string): Observable<Specialist> {
    const url = `${this.specialistUrl}/${id_user}`;
    return this.http.get<Specialist>(url);
  }

  getSpecialization(id:string): Observable<Specialization> {
    const url = `${this.specializahionUrl}/${id}`;
    return this.http.get<Specialization>(url);
  }


  updateUser(id: string, fullName: string) {
    const url = `${this.clientPutUrl}/${id}`;
    const body = { full_name: fullName };
    return this.http.put(url, body);
  }

  updateClientPhoto(id: string, file: FormData) {
    const url = `${this.clientPutPhotoUrl}/${id}`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data'); // Установите правильный тип содержимого
    console.log(file)
    return this.http.put(url, file, { headers });
  }

  updateSpecialistPhoto(id: string, file: FormData) {
    const url = `${this.specialistPutPhotoUrl}/${id}`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data'); // Установите правильный тип содержимого
    console.log(file)
    return this.http.put(url, file, { headers });
  }

  deleteClientPhoto(id:any){
    const url = `${this.clientPutPhotoUrl}/${id}`;
    return this.http.delete(url,httpOptions);
  }

  deleteSpecialistPhoto(id:any){
    const url = `${this.specialistPutPhotoUrl}/${id}`;
    return this.http.delete(url,httpOptions);
  }

  updateServicesSpecialist(id: string, fieldsToUpdate: any): Observable<any> {
    const url = `${this.specialistServicePutPhotoUrl}/${id}`;
    return this.http.put(url, fieldsToUpdate);
  }
}
