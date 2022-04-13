import { Component, OnInit } from '@angular/core';
import { CookieService } from '../cookie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  adminloggedin = false;

  constructor(private cookie: CookieService) { }

  ngOnInit(): void {
    if(this.cookie.get("usertype") == "admin")
    {
      this.adminloggedin = true;
    }
  }

  logout(){
    this.cookie.delete("usertype");
    this.cookie.delete("name");
    this.cookie.delete("id");
    window.location.href = "../";
  }

}
