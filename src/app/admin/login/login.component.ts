import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { windowWhen } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { CookieService } from 'src/app/cookie.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   data:any = "";
   message = "";
      
  constructor(private api:ApiService, private cookie:CookieService, private router: Router) { }

  ngOnInit(): void {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    
    this.data = new FormGroup({
      email : new FormControl("", Validators.compose([Validators.required, Validators.email])),
      password : new FormControl("", Validators.compose([Validators.required])),
    });


  }
  submit(data:any){

     let mydata = {data:data};
      // console.log(mydata);
      this.api.post("admin/login/",mydata).subscribe((result:any)=>{
        if(result.data.status == "success"){
          this.cookie.set("usertype", "admin");
          this.cookie.set("name", result.data.admin.name);
          this.cookie.set("id", result.data.admin._id);
          //this.router.navigate(["./admin/dashboard"]);          
          window.location.href = "./admin/dashboard";
        }
        else{
          this.message = '<div class="alert alert-danger" role="alert">Email or password is wrong.</div>';
        }
      })
  }
}
