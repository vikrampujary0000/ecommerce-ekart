import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http = inject(HttpClient);

  getCategories(): Observable<{ category: Category[], message: string }> {
    return this.http.get<{ category: Category[], message: string }>(`${environment.apiUrl}/category`).pipe(
      catchError((err) => {
        console.error('Error fetching categories:', err);
        return throwError(() => new Error('Error fetching categories'));
      })
    )
  }

  addCategory(name: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/category`, { name: name }).pipe(
      catchError((err) => {
        console.error('Error adding category:', err);
        return throwError(() => new Error('Error adding category'));
      })
    );;
  }

  getCategoryById(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/category/${id}`).pipe(
      catchError((err) => {
        console.error(`Error fetching category with id ${id}:`, err);
        return throwError(() => new Error(`Error fetching category with id ${id}`));
      })
    );
  }

  updateCategory(id: string, name: string): Observable<any> {
    return this.http.put(`${environment.apiUrl}/category/${id}`, { name: name }).pipe(
      catchError((err) => {
        console.error(`Error updating category with id ${id}:`, err);
        return throwError(() => new Error(`Error updating category with id ${id}`));
      })
    );
  }

  deleteCategoryById(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/category/${id}`).pipe(
      catchError((err) => {
        console.error(`Error deleting category with id ${id}:`, err);
        return throwError(() => new Error(`Error deleting category with id ${id}`));
      })
    );
  }
}
