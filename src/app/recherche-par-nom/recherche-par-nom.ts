import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Hotel } from '../model/hotel.model';
import { HotelService } from '../services/hotel';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recherche-par-nom.html'
})
export class RechercheParNomComponent implements OnInit {

  hotels: Hotel[] = [];
  allHotels: Hotel[] = [];
  searchKeyword: string = '';

  constructor(private hotelService: HotelService, private authService: Auth) {}

  ngOnInit(): void {
    // Load all hotels from Spring Boot
    this.hotelService.getAllHotels().subscribe({
      next: (data) => {
        this.allHotels = data;
      },
      error: (err) => {
        console.error('Erreur chargement hotels:', err);
      }
    });
  }

  filterHotels(): void {
    const keyword = this.searchKeyword.trim().toLowerCase();
    if (!keyword) {
      this.hotels = this.allHotels;
      return;
    }
    // Filter locally by name (keyup event)
    this.hotels = this.allHotels.filter(h =>
      h.nomHotel?.toLowerCase().includes(keyword)
    );
  }

  rechercherProds(): void {
    const keyword = this.searchKeyword.trim();
    if (keyword) {
      this.hotelService.rechercherParNom(keyword).subscribe({
        next: (data) => {
          this.hotels = data;
        },
        error: (err) => {
          console.error('Erreur recherche par API:', err);
        }
      });
    } else {
      this.hotels = this.allHotels;
    }
  }


  isAdmin(): boolean {
    return this.authService.isAdmin() as boolean;
  }

  supprimerHotel(h: Hotel): void {
    if (confirm('Etes-vous sûr ?') && h.idHotel) {
      this.hotelService.supprimerHotel(h.idHotel).subscribe({
        next: () => {
          this.filterHotels();
        },
        error: (err) => {
          console.error('Erreur suppression:', err);
        }
      });
    }
  }
}