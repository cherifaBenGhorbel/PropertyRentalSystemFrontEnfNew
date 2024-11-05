import { HouseGuard } from './house.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHouseComponent } from './add-house/add-house.component';
import { HousesComponent } from './houses/houses.component';
import { UpdateHouseComponent } from './update-house/update-house.component';
import { SearchByOwnerComponent } from './search-by-owner/search-by-owner.component';
import { SearchByAddressComponent } from './search-by-address/search-by-address.component';
import { ListeOwnersComponent } from './liste-owners/liste-owners.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: "houses", component: HousesComponent },
  { path: "add-house", component: AddHouseComponent, canActivate: [HouseGuard] },
  { path: "updateHouse/:id", component: UpdateHouseComponent, canActivate: [HouseGuard] },
  { path: "searchByOwner", component: SearchByOwnerComponent },
  { path: "searchByAddress", component: SearchByAddressComponent },
  { path: "ownersList", component: ListeOwnersComponent , canActivate: [HouseGuard]},
  { path: "login", component: LoginComponent ,canActivate: [AuthGuard]},
  { path: "app-forbidden", component: ForbiddenComponent },
  { path: "", redirectTo: "houses", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
