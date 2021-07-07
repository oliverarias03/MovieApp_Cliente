import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Movie } from '../models/movie.model';
import { Video } from '../models/Video.model';
import { MovieTrailerComponent } from '../movies/movie-trailer/movie-trailer.component';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {
  loading:boolean = false;

  saving:boolean = false;

  savedTitles: any[] = [];

  resultList:Movie[] = [];

  plot: string = "";

  video: Video = new Video();

  videosList: Video[] = [];

  @ViewChild(MovieTrailerComponent)
  trailer: MovieTrailerComponent = new MovieTrailerComponent();

  constructor(private srv: SharedService) { }

  ngOnInit(): void {
    this.getMoviesByUser();
  }

  getMoviesByUser(){
    this.loading = true;
    this.srv.GetMoviesByUser(sessionStorage.getItem("userId")).subscribe((res)=>{
      // console.log(res);

      res.forEach(element => {
        this.getDetails(element.MovieId,element.MovieType);
      });
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

  getDetails(id: string, type: string){
    if(type === "tv"){

      this.srv.searchTV(id).subscribe((res)=>{

        res.isMovie = false;
        res.media_type = "tv";

        if(res.poster_path === null){
          res.poster_path = "https://via.placeholder.com/150x225/a8adb5";
        }else{
          res.poster_path = "http://image.tmdb.org/t/p/w500"+res.poster_path;
        }
        this.resultList.push(res);

      },(error)=>{
        Swal.fire({
          title: 'Error!',
          text: error.error,
          icon: 'error'
        });
        this.loading = false;
      })

    }else if(type === "movie"){

      this.srv.searchMovie(id).subscribe((res)=>{

        res.isMovie = true;
        res.media_type = "movie";

        if(res.poster_path === null){
          res.poster_path = "https://via.placeholder.com/150x225/a8adb5";
        }else{
          res.poster_path = "http://image.tmdb.org/t/p/w500"+res.poster_path;
        }

        this.resultList.push(res);

      },(error)=>{
        Swal.fire({
          title: 'Error!',
          text: error.error,
          icon: 'error'
        });
        this.loading = false;
      })
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

  removeLike(item: Movie){
    this.saving = true;

    const entity = {
      UserId: sessionStorage.getItem("userId"),
      MovieId: item.id.toString(),
      MovieType: item.media_type
    }

    this.srv.deleteMovie(entity).subscribe((res)=>{

      Swal.fire({
        title: 'Titulo Eliminado',
        icon: 'success'
      });
      this.saving = false;
      this.resultList = [];
      this.getMoviesByUser();

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
