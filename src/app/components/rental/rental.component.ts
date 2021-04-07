import { Component, OnInit } from '@angular/core';
import { RentalDTO } from 'src/app/models/rentalDTO';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
 rentals:RentalDTO[]=[]
  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getRental()
  }

  getRental(){
    this.rentalService.getRentalList().subscribe(response=>{
    this.rentals=response.data
    console.log("component")
    console.log(this.rentals)
    })
      }

}
