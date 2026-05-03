import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../model/hotel.model';
import { TypeHotel } from '../model/typeHotel.model';
import { TypeHotelWrapper } from '../model/typeHotelWrapper.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  
  // Custom Controller API (Port 8081 with /api)
  apiURL: string = 'http://localhost:8081/api';
  
  // Spring Data REST API (Port 8081 without /api)
  apiURLType: string = 'http://localhost:8081/type-hotel';

  constructor(private http: HttpClient) {}

  getAllHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.apiURL + '/hotels');
  }

  getHotelById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiURL}/hotels/${id}`);
  }

  ajouterHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.apiURL + '/hotels', hotel, httpOptions);
  }

  updateHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.put<Hotel>(this.apiURL + '/hotels', hotel, httpOptions);
  }

  supprimerHotel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/hotels/${id}`);
  }

  rechercherParType(idType: number): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.apiURL}/hotels/type/${idType}`);
  }

  // Section 13 : Uses Spring Data REST endpoint
  getAllTypeHotels(): Observable<TypeHotelWrapper> {
    return this.http.get<TypeHotelWrapper>(this.apiURLType);
  }

  consulterType(id: number): Observable<TypeHotel> {
    return this.http.get<TypeHotel>(`${this.apiURL}/type-hotel/${id}`);
  }

  ajouterType(type: TypeHotel): Observable<TypeHotel> {
    return this.http.post<TypeHotel>(this.apiURL + '/type-hotel', type, httpOptions);
  }

  rechercherParNom(nom: string): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.apiURL}/hotels/nom/${nom}`);
  }

  uploadImage(file: File, id: number): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(`${this.apiURL}/uploadImage/${id}`, formData);
  }
}