import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Data } from './data.model';

 
const apiUrl = 'http://localhost:3000/data'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }


  getAll(): Observable<Data[]> {
    return this.http.get<Data[]>(apiUrl);
  }

  get(id: any): Observable<Data> {
    return this.http.get<Data>(`${apiUrl}/${id}`);
  }

  create(data: Data): Observable<any> {
    data.id = new Date().getTime()
    return this.http.post(apiUrl, data);
  }

  update(id: any, data: Data): Observable<any> {
    // console.log('done', id, data)
    return this.http.put(`${apiUrl}/${id}`, data);
  }


  delete(id: any): Observable<any> {
    return this.http.delete(`${apiUrl}/${id}`);
  }

}
