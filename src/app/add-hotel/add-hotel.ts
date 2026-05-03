import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Hotel } from '../model/hotel.model';
import { HotelService } from '../services/hotel';
import { TypeHotel } from '../model/typeHotel.model';

@Component({
  selector: 'app-add-hotel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-hotel.html'
})
export class Addhotel implements OnInit {
  newHotel = new Hotel();
  typeHotelsList: TypeHotel[] = [];
  message!: string;
  hotelForm!: FormGroup;
  uploadedImage!: File;

  constructor(
    private hotelService: HotelService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Load types from Spring Boot API
    this.hotelService.getAllTypeHotels().subscribe({
      next: (data) => {
        this.typeHotelsList = data._embedded.typeHotels;
      },
      error: (err) => {
        console.error('Erreur chargement types:', err);
      }
    });

    this.hotelForm = this.formBuilder.group({
      nomHotel: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      villeHotel: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      prixNuit: ['', [Validators.required, Validators.min(10), Validators.max(5000)]],
      etoiles: ['', [Validators.required, Validators.min(1), Validators.max(7)]],
      idType: ['', Validators.required]
    });

  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
  }

  addHotel(): void {
    if (this.hotelForm.invalid) {
      Object.keys(this.hotelForm.controls).forEach(key => {
        this.hotelForm.get(key)?.markAsTouched();
      });
      return;
    }

    const values = this.hotelForm.value;
    this.newHotel.nomHotel = values.nomHotel;
    this.newHotel.villeHotel = values.villeHotel;
    this.newHotel.prixNuit = values.prixNuit;
    this.newHotel.etoiles = values.etoiles;
    this.newHotel.typeHotel = this.typeHotelsList.find(t => t.idType == values.idType);


    // Call Spring Boot POST /hotels/api/hotels
    this.hotelService.ajouterHotel(this.newHotel).subscribe({
      next: (h) => {
        if (this.uploadedImage) {
          this.hotelService.uploadImage(this.uploadedImage, h.idHotel!).subscribe({
            next: () => this.router.navigate(['hotels']),
            error: (err) => console.error(err)
          });
        } else {
          this.router.navigate(['hotels']);
        }
      },
      error: (err) => {
        console.error('Erreur ajout hotel:', err);
        this.message = 'Erreur lors de l\'ajout !';
      }
    });
  }
}