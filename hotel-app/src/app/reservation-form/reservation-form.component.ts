import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})

export class ReservationFormComponent implements OnInit{

  reservationForm: FormGroup = new FormGroup({});

  // Constructor to use FormBuilder
  // Can be used for Dependencies Injection (creation of service instance)
  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  // Validators
  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    })

    // fetch id of the reservation to be updated from the url bar
    // using ActivatedRoute Service
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id){
      let reservation = this.reservationService.getReservation(id);
      if (reservation){
        this.reservationForm.patchValue(reservation);
      }
    }
  }


  onSubmit(){
    if (this.reservationForm.valid){
      // Get the values from the form and store it in "Reservation"-type variable
      let reservation: Reservation = this.reservationForm.value;

      // Check if we are updating or creating a reservation
      // By checking the url bar
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if (id){
        // Update a reservation
        this.reservationService.updateReservation(id, reservation);
      } else {
        // Create a new reservation
        this.reservationService.addReservation(reservation);
      }

      // After clicking on submit button, this method will route us to
      // reservation list page
      this.router.navigate(['/list']);
    }
  }
}
