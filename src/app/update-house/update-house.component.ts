import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { House } from '../model/house.model';
import { Owner } from '../model/owner.model';
import { HouseService } from '../services/house.service';

@Component({
  selector: 'app-update-house',
  templateUrl: './update-house.component.html',
  styles: ``
})

export class UpdateHouseComponent implements OnInit {
  currentHouse = new House();
  owners!: Owner[];
  updateOwnerId!: number;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private houseService: HouseService) { }


  ngOnInit() {
    this.houseService.listeOwners().subscribe(own => {
      this.owners = own._embedded.owners;
      console.log(own);
    });
    this.houseService.consulteHouse(this.activatedRoute.snapshot.params['id']).
      subscribe(hows => {
        this.currentHouse = hows;
        this.updateOwnerId = this.currentHouse.owner.idOwner;
      });
    // this.owners = this.houseService.listeOwners();
    //this.currentHouse = this.houseService.consulteHouse(this.activatedRoute.snapshot.params['id']);
    //this.updateOwnerId = this.currentHouse.owner.idOwner;
    //console.log(this.currentHouse);
  }


  /* updateHouse(){
    //console.log(this.currentHouse);
    // this.currentHouse.owner = this.houseService.consulteOwner(this.updateOwnerId);
    this.houseService.updateHouse(this.currentHouse);
    this.router.navigate(["houses"]);
  } */


  updateHouse() {
    this.currentHouse.owner = this.owners.find(own => own.idOwner == this.updateOwnerId)!;
    this.houseService.updateHouse(this.currentHouse).subscribe(hows => {
      this.router.navigate(['houses']);
    });
  }

}
