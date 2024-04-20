import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LocationComponent } from './pages/location/location.component';
import { DestinationsComponent } from './pages/destinations/destinations.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AuthGuard } from './service/authorization/auth.guard';
const routes: Routes = [
  // { path: '', component: HomepageComponent,canActivate: [AuthGuard] },
  { path: '', component: HomepageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'location', component: LocationComponent },
  { path: 'destinations', component: DestinationsComponent},
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
