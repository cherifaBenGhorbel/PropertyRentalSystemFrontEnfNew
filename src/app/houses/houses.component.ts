import { Component, OnInit } from '@angular/core';
import { House } from '../model/house.model';
import { HouseService } from '../services/house.service';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html'
})
export class HousesComponent implements OnInit {
  houses?: House[];

  constructor(private houseService: HouseService , public authService:AuthService) {

  }

  ngOnInit(): void {
    this.chargedHouses();

  }


  chargedHouses() {
    //this.houses = this.houseService.listHouse();
    this.houseService.listHouse().subscribe(hous => {
      //console.log(hous);
      this.houses = hous;
    })
  }
  delete_House(house: House) {
    let conf = confirm("Are You sur ?");
    if (conf) {
      this.houseService.deleteHouse(house.idHouse).subscribe(() => {
        console.log("House was deleted");
        this.chargedHouses();

      }
      )
    }
  }

  /* 
    delete_House(house:House){
      console.log(house);
      let conf = confirm("Are You sur ?");
      if(conf){
        this.houseService.deleteHouse(house);
      }
    } */
}
