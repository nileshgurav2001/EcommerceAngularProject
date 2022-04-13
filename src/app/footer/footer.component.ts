import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { CookieService } from '../cookie.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  adminloggedin = false;
  data:any;

  constructor(private cookie: CookieService, private api:ApiService) { }

  ngOnInit(): void {
    if(this.cookie.get("usertype") == "admin")
    {
      this.adminloggedin = true;
    }

    this.data= new FormGroup({
      email : new FormControl("",Validators.compose([Validators.required]))
    })
  }

  submit(data:any){
  let mydata = {data:data}
  console.log(mydata);
  this.api.post("subscription/save", mydata).subscribe((result)=>{
    alert("Success");
    this.data != "";
  })
  }

}
