import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { CookieService } from 'src/app/cookie.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  
  orders:any;

  constructor(public api: ApiService, private cookie: CookieService) { }



  ngOnInit(): void {
   this.list();
  }

  list(){
    this.api.post("order/list", { data: {} }).subscribe((result:any) => {
      this.orders = result.data;
  })
  }

  delete(id:any){
     if(confirm("sure to delete!")){
       this.api.post("order/delete", {data:{id}}).subscribe((result)=>{
         this.list();
       })
     }
  }

}
