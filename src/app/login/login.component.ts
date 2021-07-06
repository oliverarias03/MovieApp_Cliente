import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string = "";
  password: string = "";

  loggedIn: boolean = false;

  constructor(private srv: SharedService,private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){

    if(this.userName === "" || this.password === ""){
      Swal.fire({
        title: 'Error!',
        text: 'Completar Campos',
        icon: 'error'
      });

    }else{
      const entity = {
        Email: this.userName,
        Password: this.password
      }

      this.srv.login(entity).subscribe((res)=>{

        sessionStorage.setItem("userId", res.Id);
        sessionStorage.setItem("name", res.Name);
        sessionStorage.setItem("photo", res.PhotoFileName);

        this.loggedIn = true;

        Swal.fire({
          title: 'Bienvenido!',
          text: res.Name,
          icon: 'success'
        });

        this.router.navigate(['/search']);

      },(error)=>{
        Swal.fire({
          title: 'Error!',
          text: error.error,
          icon: 'error'
        });
      });
    }
  }

}
