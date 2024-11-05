import { Component, OnInit } from '@angular/core';
import { House } from '../model/house.model';
import { HouseService } from '../services/house.service';

@Component({
  selector: 'app-search-by-address',
  templateUrl: './search-by-address.component.html',
  styles: ``
})
export class SearchByAddressComponent implements OnInit {

  houses!: House[];
  addressH!: string;
  allHouses!: House[];

  constructor(private houseService: HouseService) { }


  ngOnInit(): void {
    this.houseService.listHouse().subscribe(hows => {
      this.allHouses = hows;
    });
  }

  onKeyUp(searchTerm: string) {
    this.houses = this.allHouses.filter(item =>
      item.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  SearchHouses() {
    this.houseService.getHousesByAddress(this.addressH).subscribe(hows => {
      this.houses = hows;
      console.log(hows);
    })
  }

}
