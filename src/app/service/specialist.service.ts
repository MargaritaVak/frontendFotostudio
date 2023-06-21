import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Specialist } from '../models/specialist';
import {Service_specialist} from "../models/service_specialist";
import {Client} from "../models/client";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
// @ts-ignore
@Injectable({
  providedIn: 'root',
})
export class SpecialistService {
  private specialistUrl = 'http://localhost:3000/specialist'; // URL to web api
  private serviceSpecialistUrl = 'http://localhost:3000/service-specialist';
  private addServiceSpecialistUrl = 'http://localhost:3000/add-service-specialist';
  private deleteServiceSpecialistUrl = 'http://localhost:3000/service-specialist'
  private updateSpecialistUrl ='http://localhost:3000/update-specialist'
  private updatePortfolioUrl ='http://localhost:3000/update-portfolio-service'
  private deletePortfolioUrl= 'http://localhost:3000/delete-portfolio'
  private calendarUrl ='http://localhost:3000/specialist-calendar'
  constructor(private http: HttpClient) {}

  addServiceSpecialist(
    id_specialist: string,
    id_service: string,
    time_services: any,
    cost_services: string,
    more_info?: string,
    files?: File[]
  ): Observable<any> {
    console.log( id_specialist,
      id_service,
      time_services,
      cost_services,
      more_info,
      files)
    const formData = new FormData();
    formData.append('id_specialist', id_specialist);
    formData.append('id_service', id_service);
    formData.append('time_services', JSON.stringify(time_services));
    formData.append('cost_services', cost_services);
    if (more_info) {
      formData.append('more_info', more_info);
    }
    if (files && files.length > 0) {
      for (let file of files) {
        formData.append('files', file);
      }
    }
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(this.addServiceSpecialistUrl, formData,{headers});
  }
  getSpecialistById(id_user: any): Observable<Specialist> {
    const url = `${this.specialistUrl}/${id_user}`;
    return this.http.get<Specialist>(url);
  }

  getServiceSpecialistId(id:any):Observable<Service_specialist[]>{
    const url = `${this.serviceSpecialistUrl}/${id}`;
    return this.http.get<Service_specialist[]>(url);
  }

  deleteServiceSpecialist(id: string): Observable<any> {
    const url = `${this.deleteServiceSpecialistUrl}/${id}`;
    return this.http.delete(url);
  }

  updateSpecialist(id: string, specialistData: any): Observable<any> {
    const url = `${this.updateSpecialistUrl}/${id}`;
    return this.http.put(url, specialistData);
  }

  updatePortfolio(serviceId: string, files: File[]): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('serviceId', serviceId.toString());
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    return this.http.put<any>(`${this. updatePortfolioUrl}/${serviceId}`, formData);
  }

  deletePortfolio(serviceId: string):Observable<any> {
    const url = `${this.deletePortfolioUrl}/${serviceId}`;
    // @ts-ignore
    return this.http.put<any>(url)
  }

  calendarSpecialist(id: string):Observable<any> {
    const url = `${this.calendarUrl}/${id}`;
    return this.http.get<any>(url)
  }


}
