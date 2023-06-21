import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MainPageBodyComponent } from './main-page-body/main-page-body.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginBodyComponent } from './login-client/login-body/login-body.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AllCategoryComponent } from './all-category/all-category.component';
import { LocationPageComponent } from './location-page/location-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AppRouterModule } from './app-router/app-router.module';
import { authInterceptorProviders } from './helper/auth.interceptor';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RegistrationClientComponent } from './registration-client/registration-client.component';
import { RegistrationSpecialistComponent } from './registration-specialist/registration-specialist.component';
import {ClientPersonalAccountComponent} from "./client-personal-account/client-personal-account.component";
import { PersonalAccountClientComponent } from './personal-account-client/personal-account-client.component';
import { PersonalAccountSpecialistComponent } from './personal-account-specialist/personal-account-specialist.component';
import { BasketComponent } from './basket/basket.component';
import {MatTableModule} from "@angular/material/table";
import {ChunkPipe} from "./personal-account-client/chunk.pipe";
import { LocationMoreDetailedComponent } from './location-more-detailed/location-more-detailed.component';
import { SpecialistMoreDetailedComponent } from './specialist-more-detailed/specialist-more-detailed.component';
import { AddServiceDialogComponent } from './add-service-dialog/add-service-dialog.component'
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialogContainer} from '@angular/material/dialog';
import { OrderComponent } from './order/order.component';
import { BookingModalComponent } from './booking-modal/booking-modal.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AlbumComponent } from './album/album.component';


// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageBodyComponent,
    LoginBodyComponent,
    AllCategoryComponent,
    LocationPageComponent,
    SignUpComponent,
    RegistrationClientComponent,
    RegistrationSpecialistComponent,
    ClientPersonalAccountComponent,
    PersonalAccountClientComponent,
    PersonalAccountSpecialistComponent,
    BasketComponent,
    ChunkPipe,
    LocationMoreDetailedComponent,
    SpecialistMoreDetailedComponent,
    AddServiceDialogComponent,
    OrderComponent,
    BookingModalComponent,
    AlbumComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    AppRouterModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,


  ],
  providers: [{ provide: authInterceptorProviders,  useValue: {}}],
  bootstrap: [AppComponent],
})
export class AppModule {}

