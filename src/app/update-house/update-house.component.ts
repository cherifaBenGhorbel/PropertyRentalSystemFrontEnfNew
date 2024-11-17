import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { House } from '../model/house.model';
import { Image } from '../model/image.model';
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

  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private houseService: HouseService) { }


  ngOnInit(): void {
    this.houseService.listeOwners().
    subscribe(hows => {
      this.owners = hows._embedded.owners;
    });

    this.houseService.consulteHouse(this.activatedRoute.snapshot.params['id'])
    .subscribe(hows => {
      this.currentHouse = hows;
      this.updateOwnerId = hows.owner.idOwner;
    });



    /*
    this.houseService.listeOwners().subscribe({
      next: (own) => {
        this.owners = own._embedded.owners;
        console.log('Owners loaded:', own);
      },
      error: (err) => {
        console.error('Error loading owners:', err);
      },
    });

    this.houseService.consulteHouse(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (hows) => {
        this.currentHouse = hows;
        this.updateOwnerId = hows.owner.idOwner;

        if (this.currentHouse.image?.idImage) {
          this.houseService.loadImage(this.currentHouse.image.idImage).subscribe({
            next: (img: Image) => {
              this.myImage = 'data:' + img.type + ';base64,' + img.image;
            },
            error: (err) => {
              console.error('Error loading image:', err);
            },
          });
        } else {
          console.warn('No image associated with this house.');
        }
      },
      error: (err) => {
        console.error('Error loading house:', err);
      },
    });

*/

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
    this.currentHouse.owner = this.owners.find(own => own.idOwner 
      == this.updateOwnerId)!;
    this.houseService
    .updateHouse(this.currentHouse)
    .subscribe((hous) => {
      this.router.navigate(['houses']);
    });



    /*
    this.currentHouse.owner = this.owners.find(own => own.idOwner == this.updateOwnerId)!;
    //test if image is modified
    if (this.isImageUpdated) {
      this.houseService.uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe((img: Image) => {
          this.currentHouse.image = img;

          this.houseService.updateHouse(this.currentHouse).subscribe((hows) => {
            this.router.navigate(['houses']);
          });
        });

    }
    else {
      this.houseService
        .updateHouse(this.currentHouse)
        .subscribe(hows => {
          this.router.navigate(['houses']);
        });
    }*/
  }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
    }
  }

  onAddImageHouse() {
    this.houseService
      .uploadImageHouse(
        this.uploadedImage,
        this.uploadedImage.name, 
        this.currentHouse.idHouse)
      
        .subscribe((img: Image) => { 
          console.log('Uploaded Image:', img);
          this.currentHouse.images.push(img);
      });
  }
  deleteImage(img: Image) {
    let conf = confirm("Are You sur ?");
    if (conf)
      this.houseService.supprimerImage(img.idImage).subscribe(() => {
        //delete image of  table currentHouse.images
        const index = this.currentHouse.images.indexOf(img, 0);
        if (index > -1) {
          this.currentHouse.images.splice(index, 1);
        }
      });
  }

}
