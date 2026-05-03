import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hotel } from '../model/hotel.model';
import { HotelService } from '../services/hotel';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TypeHotel } from '../model/typeHotel.model';

@Component({
  selector: 'app-update-hotel',
  standalone: true,
imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './update-hotel.html',
  styles: ``
})
export class Updatehotel implements OnInit {
  currentHotel = new Hotel();
  typeHotelsList: TypeHotel[] = [];
  hotelForm!: FormGroup;
  uploadedImage!: File;
  imagePath: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.hotelForm = this.formBuilder.group({
      idHotel: [null],
      nomHotel: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      prixNuit: ['', [Validators.required, Validators.min(10), Validators.max(5000)]],
      etoiles: ['', [Validators.required, Validators.min(1), Validators.max(7)]],
      villeHotel: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      idType: [null]
    });


    // Load types from Spring Boot API
    this.hotelService.getAllTypeHotels().subscribe({
      next: (data) => {
        this.typeHotelsList = data._embedded.typeHotels;
      },
      error: (err) => {
        console.error('Erreur chargement types:', err);
      }
    });


    // Get hotel id from URL
    const hotelId = +this.activatedRoute.snapshot.params['id'];

    // Load hotel from Spring Boot API
    this.hotelService.getHotelById(hotelId).subscribe({
      next: (hotel) => {
        this.currentHotel = hotel;
        this.hotelForm.patchValue({
          idHotel: hotel.idHotel,
          nomHotel: hotel.nomHotel,
          prixNuit: hotel.prixNuit,
          etoiles: hotel.etoiles,
          villeHotel: hotel.villeHotel,
          idType: hotel.typeHotel?.idType
        });

      },
      error: (err) => {
        console.error('Erreur chargement hotel:', err);
        this.router.navigate(['hotels']);
      }
    });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
  }

  updateHotel(): void {
    if (this.hotelForm.invalid) {
      Object.keys(this.hotelForm.controls).forEach(key => {
        this.hotelForm.get(key)?.markAsTouched();
      });
      return;
    }

    const formValues = this.hotelForm.value;
    this.currentHotel.nomHotel = formValues.nomHotel;
    this.currentHotel.prixNuit = formValues.prixNuit;
    this.currentHotel.etoiles = formValues.etoiles;
    this.currentHotel.villeHotel = formValues.villeHotel;
    this.currentHotel.typeHotel = this.typeHotelsList.find(t => t.idType == formValues.idType);


    // Call Spring Boot PUT /hotels/api/hotels
    this.hotelService.updateHotel(this.currentHotel).subscribe({
      next: (h) => {
        if (this.uploadedImage) {
          this.hotelService.uploadImage(this.uploadedImage, this.currentHotel.idHotel!).subscribe({
            next: () => this.router.navigate(['hotels']),
            error: (err) => console.error(err)
          });
        } else {
          this.router.navigate(['hotels']);
        }
      },
      error: (err) => {
        console.error('Erreur mise à jour hotel:', err);
      }
    });
  }
}