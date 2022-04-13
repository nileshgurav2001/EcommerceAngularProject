import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './admin/login/login.component';
import{HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProductsComponent as AdminProductsComponent } from './admin/products/products.component';
import { ProductsComponent } from './products/products.component';
import { MenusComponent } from './admin/menus/menus.component';
import { SubscriptionsComponent } from './admin/subscriptions/subscriptions.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ProductComponent } from './admin/product/product.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { OrderNowComponent } from './order-now/order-now.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    DashboardComponent,
    ProductsComponent,    
    MenusComponent,
    SubscriptionsComponent,
    OrdersComponent,
    AdminProductsComponent,
    ProductComponent,
    SingleProductComponent,
    OrderNowComponent,
   
 
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
