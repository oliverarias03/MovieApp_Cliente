import { Component, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MovieClient';

  // name = sessionStorage.getItem("name");
  // userId = sessionStorage.getItem("userId");
  // photo = this.service.PhotoUrl+sessionStorage.getItem("photo");

  constructor() {
  }

}
