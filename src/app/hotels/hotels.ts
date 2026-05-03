import { Component, OnInit } from '@angular/core';
import { Hotel } from '../model/hotel.model';
import { CommonModule } from '@angular/common';
import { HotelService } from '../services/hotel';
import { RouterLink, RouterModule } from '@angular/router';
import { Auth } from '../services/auth';
import { SearchFilterPipe } from '../search-filter-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, FormsModule],
  templateUrl: './hotels.html',
})
export class hotels implements OnInit {

  hotelsList: Hotel[] = [];
  searchTerm: string = '';
  loadError: string | null = null;
  isLoading = true;

  constructor(private hotelService: HotelService, public authService: Auth) { }

  ngOnInit() {
    this.loadHotels();
  }

  loadHotels() {
    this.isLoading = true;
    this.loadError = null;

    this.hotelService.getAllHotels().subscribe({
      next: (data) => {
        this.hotelsList = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement hotels:', err);
        this.loadError = 'Impossible de charger les hôtels. Le serveur est-il démarré ?';
        this.isLoading = false;
      }
    });
  }

  supprimerHotel(hotel: Hotel) {
    if (confirm('Etes-vous sûr de vouloir supprimer cet hôtel ?') && hotel.idHotel) {
      this.hotelService.supprimerHotel(hotel.idHotel).subscribe({
        next: () => this.loadHotels(),
        error: (err) => console.error('Erreur suppression:', err)
      });
    }
  }
}