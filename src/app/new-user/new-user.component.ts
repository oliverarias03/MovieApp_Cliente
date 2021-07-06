import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  name: string = "";
  email: string = "";
  password: string = "";
  PhotoFileName:string = "";
  PhotoFilePath:string = "";

  constructor(private service:SharedService,private router: Router) { }

  ngOnInit(): void {
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

  addUser(){
    if(this.name === "" || this.email === "" || this.password === ""){
      Swal.fire({
        title: 'Error!',
        text: 'Completar Campos',
        icon: 'error'
      });
    }else{
      var val = {
        Name:this.name,
        Email:this.email,
        Password:this.password,
        PhotoFileName:this.PhotoFileName
      };

      this.service.createUser(val).subscribe(res=>{

        Swal.fire({
          title: 'Creado!',
          text: "Usuario Creado",
          icon: 'success'
        });

        this.router.navigate(['/login']);

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
