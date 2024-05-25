import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LocationComponent } from './pages/location/location.component';
import { DestinationsComponent } from './pages/destinations/destinations.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AuthGuard } from './service/authorization/auth.guard';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AddLocationComponent } from './pages/add-location/add-location.component';
import { GraphsComponent } from './pages/graphs/graphs.component';
const routes: Routes = [
  // { path: '', component: HomepageComponent,canActivate: [AuthGuard] },
  { path: '', component: HomepageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'location', component: LocationComponent },
  { path: 'destinations', component: DestinationsComponent},
  { path: 'contact', component: ContactComponent },
  { path: "adminPage", component: AdminPageComponent},
  { path: "addLocation",component: AddLocationComponent},
  { path: "graphs", component: GraphsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
