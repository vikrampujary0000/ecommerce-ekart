import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Brand } from '../models/brand';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  http = inject(HttpClient);

  getBrands(): Observable<{ brands: Brand[], message: string }> {
    console.log(`${environment.apiUrl}/brand`);
    return this.http.get<{ brands: Brand[], message: string }>(`${environment.apiUrl}/brand`).pipe(
      catchError((err) => {
        console.error('Error fetching brands:', err);
        return throwError(() => new Error('Error fetching brands'));
      })
    )
  }

  getBrandById(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/brand/${id}`).pipe(
      catchError((err) => {
        console.error(`Error fetching brand with id ${id}:`, err);
        return throwError(() => new Error(`Error fetching brand with id ${id}`));
      })
    );
  }

  addBrand(name: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/brand`, { name: name }).pipe(
      catchError((err) => {
        console.error('Error adding brand:', err);
        return throwError(() => new Error('Error adding brand'));
      })
    );
  }

  updateBrand(id: string, name: string): Observable<any> {
    return this.http.put(`${environment.apiUrl}/brand/${id}`, { name: name }).pipe(
      catchError((err) => {
        console.error(`Error updating brand with id ${id}:`, err);
        return throwError(() => new Error(`Error updating brand with id ${id}`));
      })
    );
  }

  deleteBrandById(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/brand/${id}`).pipe(
      catchError((err) => {
        console.error(`Error deleting brand with id ${id}:`, err);
        return throwError(() => new Error(`Error deleting brand with id ${id}`));
      })
    );
  }
}
