import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:any = null;

  constructor(public api:ApiService) { 
    
  }

  ngOnInit(): void {
    this.api.post("product/list", {}).subscribe((data:any)=>{
      this.products = data.data;
    });
  }

}
