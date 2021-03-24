import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminZoneComponent } from './components/admin-zone/admin-zone.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
 
const routes: Routes = [  
    
  {path:"admin",component:AdminZoneComponent }, 
  {path:"order",component:OrderComponent }, 
  {path:"shopping",component:ShoppingComponent }, 
  {path:"login",component:LoginComponent},  
  {path:"register",component:RegisterComponent}, 
  {path:"", pathMatch:"full", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
