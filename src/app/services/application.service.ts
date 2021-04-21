import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:5005/';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  getAll(id): Observable<any> {
    return this.http.get(`${baseUrl}${id}`+"/applications");
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}applications/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(baseUrl+"application", data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}application/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}application/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl+"application");
  }

  findByApplicationType(title): Observable<any> {
    return this.http.get(`${baseUrl}?type=${title}`);
  }
}
