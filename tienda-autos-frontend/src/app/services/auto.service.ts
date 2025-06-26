import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auto } from '../models/auto.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutoService {
  private apiUrl = `${environment.apiUrl}/autos`;

  constructor(private http: HttpClient) { }

  getAutos(): Observable<Auto[]> {
    return this.http.get<Auto[]>(this.apiUrl);
  }

  getAuto(id: string): Observable<Auto> {
    return this.http.get<Auto>(`${this.apiUrl}/${id}`);
  }

  createAuto(auto: Auto): Observable<Auto> {
    return this.http.post<Auto>(this.apiUrl, auto);
  }

  updateAuto(id: string, auto: Auto): Observable<Auto> {
    return this.http.put<Auto>(`${this.apiUrl}/${id}`, auto);
  }

  deleteAuto(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
