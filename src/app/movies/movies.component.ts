import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Movie } from '../models/movie.model';
import { Video } from '../models/Video.model';
import { SharedService } from '../shared.service';
import { MovieTrailerComponent } from './movie-trailer/movie-trailer.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  resultList:Movie[] = [];

  loading:boolean = false;

  saving:boolean = false;

  searchParam: string = "";

  plot: string = "";

  video: Video = new Video();

  videosList: Video[] = [];

  @ViewChild(MovieTrailerComponent)
  trailer: MovieTrailerComponent = new MovieTrailerComponent();

  constructor(private srv: SharedService, private domSanitizer : DomSanitizer) { }

  ngOnInit(): void {
  }

  search(){
    if(this.searchParam === ""){
      Swal.fire({
        title: 'Error!',
        text: "Escriba una Pelicula o Serie de TV",
        icon: 'error'
      });
    }else{
      this.loading = true;
      this.srv.searchTitles(this.searchParam).subscribe((res)=>{
        // console.log(res);
        this.resultList = res.results;
        this.resultList = this.resultList.filter(x=> x.media_type === "tv" || x.media_type === "movie");

        this.resultList.forEach(element => {
          if(element.media_type === "tv"){
            element.isMovie = false;
          }else{
            element.isMovie = true;
          }

          if(element.poster_path === null){
            element.poster_path = "https://via.placeholder.com/150x225/a8adb5";
          }else{
            element.poster_path = "http://image.tmdb.org/t/p/w500"+element.poster_path;
          }
        });

        console.log(this.resultList);
        this.loading = false;
      },(error)=>{
        Swal.fire({
          title: 'Error!',
          text: error.error,
          icon: 'error'
        });
        this.loading = false;
      });
    }
  }

  sendPlot(plot: string){
    this.plot = plot;
  }

  sendId(item: Movie){
    this.clear();
    if(item.media_type === "tv"){
      this.srv.getVideosTV(item.id).subscribe((res)=>{
        console.log(res.results);
        this.videosList = res.results;
        this.video = this.videosList.filter(x => x.type === "Trailer")[0];
        console.log(this.video);

        //send id
        if(this.video === undefined){
          this.trailer.videoId = "";
          item.hasTrailer = false;
          this.clear();

        }else{
          this.trailer.videoId = this.video.key;
          item.hasTrailer = true;
        }

      });
    }else if(item.media_type === "movie"){
      this.srv.getVideosMovie(item.id).subscribe((res)=>{
        console.log(res.results);
        this.videosList = res.results;
        this.video = this.videosList.filter(x => x.type === "Trailer")[0];
        console.log(this.video);

         //send id
         if(this.video === undefined){
            this.trailer.videoId = "";
            item.hasTrailer = false;
            this.clear();

         }else{
            this.trailer.videoId = this.video.key;
            item.hasTrailer = true;
         }


      });
    }
  }

  clear(){
    this.video = new Video();
    this.videosList = [];
    this.resultList.forEach(element => {
      element.hasTrailer = false;
    });
  }


  saveLike(item: Movie){
    this.saving = true;

    const entity = {
      UserId: sessionStorage.getItem("userId"),
      MovieId: item.id.toString(),
      MovieType: item.media_type
    }

    this.srv.createMovie(entity).subscribe((res)=>{

      console.log(res);

      Swal.fire({
        title: 'Titulo Guardado',
        icon: 'success'
      });
      this.saving = false;

    },(error)=>{
        Swal.fire({
          title: 'Error!',
          text: error.error,
          icon: 'error'
        });
        this.saving = false;
      });

  }

}
