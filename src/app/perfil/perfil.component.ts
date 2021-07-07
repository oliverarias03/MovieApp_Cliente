import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginComponent } from '../login/login.component';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  id: any = "";
  name: string = "";
  email: string = "";
  password: string = "";
  PhotoFileName:string = "";
  PhotoFilePath:string = "";

  loggedIn: boolean = false;

  constructor(private service:SharedService,private router: Router) {
    this.id = sessionStorage.getItem("userId");
  }

  ngOnInit(): void {
    if(this.id !== ""){
      this.loadInfo(this.id);
      this.loggedIn = true;
    }
  }

  uploadPhoto(event: any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.PhotoFileName=data.toString();
      this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName;
    })
  }

  loadInfo(id:any){
    if(this.id !== ""){
      this.service.getUsersById(id).subscribe((res)=>{
        this.name = res[0].Name;
        this.password = res[0].Password;
        this.email = res[0].Email;
        this.PhotoFileName=res[0].PhotoFileName;
        this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName;
      },(error)=>{
        Swal.fire({
          title: 'Error!',
          text: error.error,
          icon: 'error'
        });
      });
    }
  }

  addUser(){
    if(this.name === "" || this.email === "" || this.password === ""){
      Swal.fire({
        title: 'Error!',
        text: 'Completar Campos',
        icon: 'error'
      });
    }else{
      var val = {
        Id: this.id,
        Name:this.name,
        Email:this.email,
        Password:this.password,
        PhotoFileName:this.PhotoFileName
      };

      this.service.editUser(val).subscribe(res=>{

        Swal.fire({
          title: 'Modificado!',
          text: "Usuario Modificado",
          icon: 'success'
        });

        sessionStorage.setItem("name", this.name);
        sessionStorage.setItem("photo", this.PhotoFileName);

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
