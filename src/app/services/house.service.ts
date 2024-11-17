import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURL, apiURLImage, apiURLOwn } from '../config';
import { House } from '../model/house.model';
import { Image } from '../model/image.model';
import { Owner } from '../model/owner.model';
import { OwnerWrapper } from '../model/ownerWrapped.model';
import { AuthService } from './auth.service';

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

  constructor(private http: HttpClient, private authService: AuthService) {

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

  listHouse(): Observable<House[]> {/*
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
*/
    return this.http.get<House[]>(apiURL + "/all"/*, { headers: httpHeaders }*/);
  }

  addHouse(house: House): Observable<House> {
    //this.houses.push(house);
    //return this.http.post<House>(apiURL, house, httpOptions);

    /*
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    */
    return this.http.post<House>(apiURL + "/addhouse", house/*, { headers: httpHeaders }*/);
  }

  addOwner(own: Owner): Observable<Owner> {
    return this.http.post<Owner>(apiURLOwn, own, httpOptions);
  }

  deleteHouse(id: number) {
    const url = `${apiURL}/delhouse/${id}`;
    /*
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    */
    return this.http.delete(url/*, { headers: httpHeaders }*/);
    //return this.http.delete(url, httpOptions);
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
    //return this.http.put<House>(apiURL, h, httpOptions);
    // console.log(h);
    //this.deleteHouse(h);
    //this.addHouse(h);
    //this.trierHouses();
    /*
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    */
    return this.http.put<House>(apiURL + "/updatehouse", h/*, { headers: httpHeaders }*/);

  }

  consulteHouse(id: number): Observable<House> {
    const url = `${apiURL}/getbyid/${id}`;
    /*
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    */
    return this.http.get<House>(url/*, { headers: httpHeaders }*/);
  }


  /* consulteHouse(id:number): House{
    this.house = this.houses.find(h => h.idHouse == id)!;
      return this.house;
    } */

  listeOwners(): Observable<OwnerWrapper> {
    //return this.http.get<OwnerWrapper>(apiURLOwn);
    /*
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    */
    return this.http.get<OwnerWrapper>(apiURLOwn/*, { headers: httpHeaders }*/);

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

  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURLImage + '/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }
  
  loadImage(id: number): Observable<Image> {
    const url = `${apiURLImage + '/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }
  uploadImageHouse(file: File, filename: string, idHous:number): Observable<any>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURLImage + '/uplaodImageHous'}/${idHous}`;
    return this.http.post(url, imageFormData);
    }

    supprimerImage(id : number) {
      const url = `${apiURLImage}/delete/${id}`;
      return this.http.delete(url, httpOptions);
      }
    
}