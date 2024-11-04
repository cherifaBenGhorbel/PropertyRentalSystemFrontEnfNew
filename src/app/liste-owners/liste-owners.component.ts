import { Component, OnInit } from '@angular/core';
import { Owner } from '../model/owner.model';
import { HouseService } from '../services/house.service';

@Component({
  selector: 'app-liste-owners',
  templateUrl: './liste-owners.component.html',
  styles: ``
})
export class ListeOwnersComponent implements OnInit {

  added: boolean = true;
  owners!: Owner[];
  constructor(private houseService: HouseService) { }
  updatedOw: Owner = { "idOwner": 0, "name": "", "phone": "", "email": "" };

  ngOnInit(): void {
    this.houseService.listeOwners().subscribe(ows => {
      this.owners = ows._embedded.owners;
      console.log(ows);
    })
  }

  onOwnerUpdate(own: Owner) {
    console.log("owner had taken the update-owner Composant", own);
    this.houseService.addOwner(own).subscribe(() => this.chargeOwners());
  }

  chargeOwners() {
    this.houseService.listeOwners().subscribe(ows => {
      this.owners = ows._embedded.owners;
      console.log(ows);
    });
  }
  update_Owner(own: Owner) {
    this.updatedOw = own;
    this.added = false;
  }
}
