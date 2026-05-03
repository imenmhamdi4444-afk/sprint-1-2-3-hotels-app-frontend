import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Hotel } from '../model/hotel.model';
import { HotelService } from '../services/hotel';
import { TypeHotel } from '../model/typeHotel.model';
import { Auth } from '../services/auth';

@Component({
  standalone: true,
  selector: 'app-recherche-par-classification',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recherche-par-classification.html',
})
export class RechercheParClassification implements OnInit {

  hotels: Hotel[] = [];
  allHotels: Hotel[] = [];
  typeHotelsList: TypeHotel[] = [];
  selectedIdType: number | null = null;

  isTypeLoading = true;
  isHotelLoading = true;
  typeLoadError: string | null = null;
  hotelLoadError: string | null = null;
  searchStarted = false;

  constructor(private hotelService: HotelService, private authService: Auth) {}

  ngOnInit(): void {
    // Load all hotels for local filtering
    this.hotelService.getAllHotels().subscribe({
      next: (data) => {
        this.allHotels = data;
        this.isHotelLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement hotels:', err);
        this.hotelLoadError = 'Impossible de charger les hôtels.';
        this.isHotelLoading = false;
      }
    });

    // Load actual types from API
    this.hotelService.getAllTypeHotels().subscribe({
      next: (data) => {
        this.typeHotelsList = data._embedded.typeHotels;
        this.isTypeLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement types:', err);
        this.typeLoadError = 'Impossible de charger les types.';
        this.isTypeLoading = false;
      }
    });

  }

  onSearch(): void {
    this.searchStarted = true;
    if (this.selectedIdType) {
      this.hotelService.rechercherParType(this.selectedIdType).subscribe({
        next: (data) => {
          this.hotels = data;
        },
        error: (err) => {
          console.error('Erreur recherche par type:', err);
          this.hotels = [];
        }
      });
    } else {
      this.hotels = [];
    }
  }


  isAdmin(): boolean {
    return this.authService.isAdmin() as boolean;
  }


  supprimerHotel(h: Hotel): void {
    if (confirm('Etes-vous sûr ?') && h.idHotel) {
      this.hotelService.supprimerHotel(h.idHotel).subscribe({
        next: () => {
          this.onSearch();
        },
        error: (err) => {
          console.error('Erreur suppression:', err);
        }
      });
    }
  }
}