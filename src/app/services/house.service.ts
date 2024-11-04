import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURL, apiURLOwn } from '../config';
import { House } from '../model/house.model';
import { Owner } from '../model/owner.model';
import { OwnerWrapper } from '../model/ownerWrapped.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};




@Injectable({
  providedIn: 'root'
})
export class HouseService {


  houses!: House[];
  owners!: Owner[];

  house?: House;

  constructor(private http: HttpClient) {

    /*     this.owners = [
          {idOwner: 1, name: 'Sonia', phone: '215898775',email:"sonia@gmail.com"},
          {idOwner: 2, name: 'John', phone: '45220369',email:"John@gmail.com"},
          {idOwner: 3, name: 'Ali', phone: '56987123',email:"Ali@gmail.com"}
        ]; */


    /*     this.houses = [
          {idHouse :1, address: "Hamamet" , rentPrice : 6250.6 ,status : "available", owner:{idOwner: 1, name: 'Sonia', phone: '215898775',email:"sonia@gmail.com"}},
          {idHouse :2, address: "Jasmin Hamamet" , rentPrice : 245.05 ,status : "rented" , owner:{idOwner: 1, name: 'Sonia', phone: '215898775',email:"sonia@gmail.com"}},
          {idHouse :3, address: "Gabis" , rentPrice : 1579 ,status : "available",owner:{idOwner: 3, name: 'Ali', phone: '56987123',email:"Ali@gmail.com"} } 
        ]; */
  }

  listHouse(): Observable<House[]> {
    return this.http.get<House[]>(apiURL);
  }

  addHouse(house: House): Observable<House> {
    //this.houses.push(house);
    return this.http.post<House>(apiURL, house, httpOptions);
  }

  addOwner(own: Owner): Observable<Owner> {
    return this.http.post<Owner>(apiURLOwn, own, httpOptions);
  }

  deleteHouse(id: number) {
    const url = `${apiURL}/${id}`
    return this.http.delete(url, httpOptions);
  }


  /*   deleteHouse(house:House){
      const index = this.houses.indexOf(house,0);
      if (index > -1) {
        this.houses.splice(index, 1);
    }
  } */

  trierHouses() {
    this.houses = this.houses.sort((n1, n2) => {
      if (n1.idHouse! > n2.idHouse!) {
        return 1;
      }
      if (n1.idHouse! < n2.idHouse!) {
        return -1;
      }
      return 0;
    });
  }



  getHousesByAddress(address: string): Observable<House[]> {
    const url = `${apiURL}/house/${address}`;
    return this.http.get<House[]>(url);

  }

  updateHouse(h: House): Observable<House> {
    return this.http.put<House>(apiURL, h, httpOptions);
    // console.log(h);
    //this.deleteHouse(h);
    //this.addHouse(h);
    //this.trierHouses();
  }

  consulteHouse(id: number): Observable<House> {
    const url = `${apiURL}/${id}`;
    return this.http.get<House>(url);
  }


  /* consulteHouse(id:number): House{
    this.house = this.houses.find(h => h.idHouse == id)!;
      return this.house;
    } */

  listeOwners(): Observable<OwnerWrapper> {
    return this.http.get<OwnerWrapper>(apiURLOwn);
  }

  /*  listeOwners(): Observable <Owner[]> {
    return this.http.get<Owner[]>(apiURL + "/own");
  } */

  consulteOwner(id: number): Owner {
    return this.owners.find(ow => ow.idOwner == id)!;
  }

  searchByOwner(idOwner: number): Observable<House[]> {
    const url = `${apiURL}/houseOwner/${idOwner}`;
    return this.http.get<House[]>(url);
  }

}