import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CookieService } from '../cookie.service';

declare var Razorpay: any;

@Component({
  selector: 'app-order-now',
  templateUrl: './order-now.component.html',
  styleUrls: ['./order-now.component.css']
})
export class OrderNowComponent implements OnInit {

  // res: any;
  form: any = {};
  paymentId: string = "";
  error: any = "";
  message: string = "Waiting";
  data: any;

  options = {
    "key": "rzp_live_swPK7rd1Iy42Cf",
    "amount": "2",
    "name": "Abhijit Gatade",
    "description": "Web Development",
    "image": "https://www.abhijitgatade.com/assets/img/favicon.png",
    "order_id": "",
    "handler": function (response: any) {
      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
    }
    ,
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": ""
    },
    "theme": {
      "color": "#3399cc"
    }
  };
  order: any;
  product: any;
  id: string | null = "";

  constructor(public api: ApiService, private cookie: CookieService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.api.post("product/get", { data: { id: this.id } }).subscribe((result: any) => {
      this.product = result.data;
      this.bind();
    });
  }



  bind() {
    this.order = new FormGroup({
      productid: new FormControl(this.id, Validators.compose([Validators.required])),
      size: new FormControl("", Validators.compose([Validators.required])),
      color: new FormControl("", Validators.compose([Validators.required])),
      name: new FormControl("", Validators.compose([Validators.required])),
      email: new FormControl("", Validators.compose([Validators.required])),
      mobileno: new FormControl("", Validators.compose([Validators.required])),
      address: new FormControl("", Validators.compose([Validators.required])),
      pincode: new FormControl("", Validators.compose([Validators.required])),
      quantity: new FormControl(1, Validators.compose([Validators.required])),
      price: new FormControl(this.product.price, Validators.compose([Validators.required])),
      shipping: new FormControl(20, Validators.compose([Validators.required])),
      total: new FormControl(this.product.price + 20, Validators.compose([Validators.required]))
    })
  }


  submit(data: any) {
    let body = { data: data };
    this.api.post("order/place", body).subscribe((result: any) => {

      this.paymentId = '';
      this.error = '';


      //this.options.order_id = result._id;
      this.options.amount = "200"; //paise
      this.options.prefill.name = data.name;
      this.options.prefill.email = data.email;
      this.options.prefill.contact = data.mobileno;
      this.options.description = this.product.name;
      var rzp1 = new Razorpay(this.options);
      rzp1.open();

      rzp1.on('payment.failed', function (response: any) {
        // Todo - store this information in the server
        console.log(response.error.code);
        console.log(response.error.description);
        console.log(response.error.source);
        console.log(response.error.step);
        console.log(response.error.reason);
        console.log(response.error.metadata.order_id);
        console.log(response.error.metadata.payment_id);
        //this.error = response.error.reason;
      }
      );

      console.log(result);
      //this.router.navigate(["admin/order"]);

    })
    console.log(data);

  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    alert("Payment Success");
    let data = { id: this.id }
    console.log(data);

    this.api.post("order/paymentstatus", { data: data }).subscribe((data: any) => {
      this.data = data.data;
      window.location.href = "/products";

    })



    // this.orderService.updateOrder(event.detail).subscribe(
    // data => {
    //     this.paymentId = data.message;
    // }
    // ,
    // err => {
    //     this.error = err.error.message;
    // }
    //);
    this.message = "Success";
  }

}
