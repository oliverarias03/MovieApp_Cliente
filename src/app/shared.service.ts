import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from './models/movie.model';

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

  }

  GetMovies():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'LikedMovies/GetMovies');
  }

  GetMoviesByUser(id: any):Observable<any[]>{

    const params: HttpParams = new HttpParams().set("userId", id);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: params,
      reportProgress: true
    };

    return this.http.get(this.APIUrl+'LikedMovies/GetMoviesByUser', httpOptions).pipe(
      map((res: any[] | any) => {
        return res;
      })
    );

  }

  createMovie(value: any){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      reportProgress: true
    };

    return this.http.post(this.APIUrl+'LikedMovies/Create', JSON.stringify(value), httpOptions).pipe(
      map((res: any[] | any) => {
        return res;
      })
    );
  }

  editMovie(value: any){
    return this.http.put(this.APIUrl+'LikedMovies/Editar',value);
  }

  deleteMovie(value: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      reportProgress: true
    };

    return this.http.post(this.APIUrl+'LikedMovies/Eliminar', JSON.stringify(value), httpOptions).pipe(
      map((res: any[] | any) => {
        return res;
      })
    );

  }

  UploadPhoto(value: any){
    return this.http.post(this.APIUrl+'users/SaveFile',value);
  }


  /**MOVIES */

  searchTitles(value:string){

    return this.http.get("https://api.themoviedb.org/3/search/multi?api_key=cfdfa64b4de4f4cf551549c80ce64620&language=en-US&query="+value+"&page=1").pipe(
      map((res: any[] | any) => {
        return res;
      })
    );
  }

  getVideosTV(value: number){
    return this.http.get("https://api.themoviedb.org/3/tv/"+value+"/videos?api_key=cfdfa64b4de4f4cf551549c80ce64620&language=en-US").pipe(
      map((res: any[] | any) => {
        return res;
      })
    );
  }

  getVideosMovie(value: number){
    return this.http.get("https://api.themoviedb.org/3/movie/"+value+"/videos?api_key=cfdfa64b4de4f4cf551549c80ce64620&language=en-US").pipe(
      map((res: any[] | any) => {
        return res;
      })
    );
  }

  searchMovie(value: string){
    return this.http.get("https://api.themoviedb.org/3/movie/"+value+"?api_key=cfdfa64b4de4f4cf551549c80ce64620&language=en-US").pipe(
      map((res: any[] | any) => {
        return res;
      })
    );
  }

  searchTV(value: string){
    return this.http.get("https://api.themoviedb.org/3/tv/"+value+"?api_key=cfdfa64b4de4f4cf551549c80ce64620&language=en-US").pipe(
      map((res: any[] | any) => {
        return res;
      })
    );
  }
}

