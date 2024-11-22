import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})

export class AppointmentListComponent implements OnInit{
  

  newAppointmentTitle: string = "";
  newAppointmentDate: Date = new Date();
  appointments: Appointment[] = []

  // Initializer Method to load the stored JSON into the html page if existed
  // Must Import OnInit And Implement it in the class we using
  ngOnInit(): void {
    let savedAppointments = localStorage.getItem("appointments")
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : []
  }

  // Method to Add an appointment from the html page 
  addAppointment(){
    if(this.newAppointmentTitle.trim().length && this.newAppointmentDate){
      let newAppoint: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      }
      this.appointments.push(newAppoint)
      //console.log(newAppoint)
      this.newAppointmentTitle = "";
      this.newAppointmentDate = new Date();

      // Save the appointments List to local Browser Storage in JSON form
      localStorage.setItem("appointments", JSON.stringify(this.appointments))
    }
  }

  // Method to delete an appointment
  deleteAppointment(index: number){
    this.appointments.splice(index, 1);
    localStorage.setItem("appointments", JSON.stringify(this.appointments))
  }

}
