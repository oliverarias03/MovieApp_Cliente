import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MoviesComponent } from '../movies.component';

@Component({
  selector: 'app-movie-trailer',
  templateUrl: './movie-trailer.component.html',
  styleUrls: ['./movie-trailer.component.css']
})
export class MovieTrailerComponent implements OnInit, OnChanges {

  @Input() videoId: any = "";

  url: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log(changes);

    if(changes.videoId.currentValue !== "" || changes.videoId.currentValue !== undefined || changes.videoId.currentValue !== null){
      this.url = "https://www.youtube.com/embed/"+changes.videoId.currentValue+"?&origin=http%3A%2F%2Fwww.themoviedb.org&hl=en&modestbranding=1&fs=1&autohide=1";
    }

  }

}

