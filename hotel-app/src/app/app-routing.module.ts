import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';

// the routing paths and its components
// exp : "localhost:4200/list" will take us to ReservationListComponent
const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "list", component: ReservationListComponent},
  {path: "new", component: ReservationFormComponent},
  // Here we are going to edit a reservation info by simply providing the :id of it
  // And using the ReservationFormComponent to edit on it with the loaded data from that reservation
  {path:"edit/:id", component: ReservationFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
