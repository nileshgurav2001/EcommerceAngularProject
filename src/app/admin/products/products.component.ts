import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { CookieService } from 'src/app/cookie.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  baseurl = this.api.baseurl;
  id:string | null = "";
  products: any;
  productdata:any;
  name:string ="";
  constructor(private api: ApiService, private cookie: CookieService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
   
    this.list();
   

  }

  list(){
    this.api.post("product/list", { data:{} }).subscribe((result: any) => {
      this.products = result.data;
      console.log(this.products);

    });
  }

  delete(id:string){
    if(confirm("Sure to Delete?")){
      let data = {id:id};
      this.api.post("product/delete", {data:data}).subscribe((result)=>{
        this.list();
      })
    }
  }

 



}
