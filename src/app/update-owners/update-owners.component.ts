import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Owner } from '../model/owner.model';

@Component({
  selector: 'app-update-owners',
  templateUrl: './update-owners.component.html',
  styles: ``
})
export class UpdateOwnersComponent implements OnInit {
  @Input()
  owner!: Owner;

  @Input()
  added!: boolean;

  @Output()
  updatedOw = new EventEmitter<Owner>();


  constructor() { }

  ngOnInit(): void {
    console.log("ngOnit of update-owners Composant", this.owner);
  }

  saveOwner() {
    this.updatedOw.emit(this.owner);
  }
}
