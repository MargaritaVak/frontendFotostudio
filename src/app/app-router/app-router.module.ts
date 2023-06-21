import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageBodyComponent } from '../main-page-body/main-page-body.component';
import { LoginBodyComponent } from '../login-client/login-body/login-body.component';
import { AllCategoryComponent } from '../all-category/all-category.component';
import { LocationPageComponent } from '../location-page/location-page.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ClientPersonalAccountComponent } from '../client-personal-account/client-personal-account.component';
import {RegistrationClientComponent} from "../registration-client/registration-client.component";
import {RegistrationSpecialistComponent} from "../registration-specialist/registration-specialist.component";
import {BasketComponent} from "../basket/basket.component";
import {LocationMoreDetailedComponent} from "../location-more-detailed/location-more-detailed.component";
import {SpecialistMoreDetailedComponent} from "../specialist-more-detailed/specialist-more-detailed.component";
import {AddServiceDialogComponent} from "../add-service-dialog/add-service-dialog.component";
import {OrderComponent} from "../order/order.component";
import {BookingModalComponent} from "../booking-modal/booking-modal.component";
import {AlbumComponent} from "../album/album.component";

const routes: Routes = [
  { path: '', component: MainPageBodyComponent },
  { path: 'login', component: LoginBodyComponent },
  { path: 'all-category', component: AllCategoryComponent },
  { path: 'location', component: LocationPageComponent },
  { path: 'sign-up', component: SignUpComponent },
  {path:'registration-client', component:RegistrationClientComponent},
  {path:'registration-specialist', component:RegistrationSpecialistComponent},
  {path:'basket', component:BasketComponent},
  {
    path: 'client-personal-account',
    component: ClientPersonalAccountComponent,
  },
  {path:'location-more-detailed/:id', component:LocationMoreDetailedComponent},
  {path:'specialist-more-detailed/:id',component:SpecialistMoreDetailedComponent},
  {path:'addService', component:AddServiceDialogComponent},
  {path: 'new-order', component:OrderComponent},
  {path:'new-booking/:id',component:BookingModalComponent},
  {path:'album/:id',component:AlbumComponent}
];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouterModule {}
