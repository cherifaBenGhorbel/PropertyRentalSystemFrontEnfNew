import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/secure.guard';
import { HousesComponent } from './houses/houses.component';

const routes: Routes = [
  { path: "houses", component: HousesComponent , canActivate: [AuthGuard] , data: { roles: ['ADMIN'] } },
  { path: "", redirectTo: "houses", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
