import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { DestinationsComponent } from './pages/destinations/destinations.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { LocationComponent } from './pages/location/location.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AddLocationComponent } from './pages/add-location/add-location.component';
import { GraphsComponent } from './pages/graphs/graphs.component';
import { NgApexchartsModule } from 'ng-apexcharts';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DestinationsComponent,
    ContactComponent,
    RegisterComponent,
    LoginComponent,
    LocationComponent,
    AdminPageComponent,
    AddLocationComponent,
    GraphsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgApexchartsModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
