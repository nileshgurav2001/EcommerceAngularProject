import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CookieService } from '../cookie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  baseurl = this.api.baseurl;
  data: any;
  products: any;
 
  id: string | null = "";
  myArray: Array<string> = [];
  count:number=1;

  constructor(private api: ApiService, private cookie: CookieService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.id = this.route.snapshot.paramMap.get("id");
    this.find();


    // this.data = new FormGroup({
    //     name : new FormControl("", Validators.compose([Validators.required])),
    //     price : new FormControl("", Validators.compose([Validators.required])),
    //     status : new FormControl("", Validators.compose([Validators.required])),
    //     instock : new FormControl("", Validators.compose([Validators.required])),
    //     description : new FormControl("", Validators.compose([Validators.required])),

    // })

  }

  find() {
    let id = this.id
    console.log(id);
    this.myArray = new Array();

    this.api.post("product/findnew", { data: id }).subscribe((result: any) => {
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i]._id == id) {
          this.myArray.push(result.data[i])
          // this.products = result.data[i];
          this.products = this.myArray;
        }
     
      }

    })
  }
  
  sub()
  {
    if(this.count!=1)
       this.count--;
  }
  add()
  {
       this.count++;
  }




}

















