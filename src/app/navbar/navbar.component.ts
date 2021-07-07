import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  name = sessionStorage.getItem("name");
  userId = sessionStorage.getItem("userId");
  photo = this.service.PhotoUrl+sessionStorage.getItem("photo");

  constructor(private service:SharedService,private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
