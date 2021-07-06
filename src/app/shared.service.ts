import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "http://localhost:5000/api/";
  readonly PhotoUrl = "http://localhost:5000/Photos/";

  constructor(private http: HttpClient) { }

  getUsers():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'users/GetUsers');
  }

  getUsersById(id: number):Observable<any>{

    const params: HttpParams = new HttpParams().set("id", id);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: params,
      reportProgress: true
    };

    return this.http.get(this.APIUrl+'users/GetUsersById', httpOptions).pipe(
      map((res: any[] | any) => {
        return res;
      })
    );

  }

  createUser(value: any){
    return this.http.post(this.APIUrl+'users/Create',value);
  }

  editUser(value: any){
    return this.http.put(this.APIUrl+'users/Editar',value);
  }

  deleteUser(value: any){
    return this.http.delete(this.APIUrl+'users/Eliminar',value);
  }

  login(value: any){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      reportProgress: true
    };

    return this.http.post(this.APIUrl+'users/Login', JSON.stringify(value), httpOptions).pipe(
      map((res: any[] | any) => {
        return res;
      })
    );

    // return this.http.post(this.APIUrl+'users/Login',value);
  }

  GetMovies():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'LikedMovies/GetMovies');
  }

  GetMoviesByUser(id: number):Observable<any[]>{

    const params: HttpParams = new HttpParams().set("id", id);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: params,
      reportProgress: true
    };

    return this.http.get(this.APIUrl+'LikedMovies/GetUsersById', httpOptions).pipe(
      map((res: any[] | any) => {
        return res;
      })
    );

  }

  createMovie(value: any){
    return this.http.post(this.APIUrl+'LikedMovies/Create',value);
  }

  editMovie(value: any){
    return this.http.put(this.APIUrl+'LikedMovies/Editar',value);
  }

  deleteMovie(value: any){
    return this.http.delete(this.APIUrl+'LikedMovies/Eliminar',value);
  }

  UploadPhoto(value: any){
    return this.http.post(this.APIUrl+'users/SaveFile',value);
  }
}
