import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Movie } from '../models/movie.model';
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

  constructor(private srv: SharedService) { }

  ngOnInit(): void {
    this.getMoviesByUser();
  }

  getMoviesByUser(){
    this.loading = true;
    this.srv.GetMoviesByUser(sessionStorage.getItem("userId")).subscribe((res)=>{
      console.log(res);

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

        console.log(res);
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

        console.log(res);
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


}
