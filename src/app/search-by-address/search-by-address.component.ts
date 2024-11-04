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
  constructor(private houseService: HouseService) { }


  ngOnInit(): void {

  }



  SearchHouses() {
    this.houseService.getHousesByAddress(this.addressH).subscribe(hows => {
      this.houses = hows;
      console.log(hows);
    })
  }

}
