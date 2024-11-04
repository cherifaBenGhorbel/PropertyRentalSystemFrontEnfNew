import { Component, OnInit } from '@angular/core';
import { House } from '../model/house.model';
import { Owner } from '../model/owner.model';
import { HouseService } from '../services/house.service';

@Component({
  selector: 'app-search-by-owner',
  templateUrl: './search-by-owner.component.html',
  styles: ``
})
export class SearchByOwnerComponent implements OnInit {
  idOwner!: number;
  houses!: House[];
  owners!: Owner[];
  constructor(private houseService: HouseService) { }

  ngOnInit(): void {
    this.houseService.listeOwners().subscribe(own => {
      this.owners = own._embedded.owners;
      console.log(own);
    });

  }


  onChange() {
    this.houseService.searchByOwner(this.idOwner).subscribe(hous => { this.houses = hous });
  }

}
