import { Component, OnInit } from '@angular/core';
import { hotel } from '../model/hotel.model';
import { hotelService } from '../services/hotel';
import { Classification } from '../model/classification.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recherche-par-nom.html'
})
export class RechercheParNomComponent implements OnInit {

  hotels: hotel[] = [];        // Liste filtrée à afficher
  allHotels: hotel[] = [];     // Toutes les données
  classifications: Classification[] = [];
  searchKeyword: string = '';
  selectedClassification: number | null = null;

  constructor(private hotelService: hotelService) {}

  ngOnInit(): void {
    // Charger les classifications
    this.classifications = this.hotelService.listeclassifications();

    // Charger tous les hôtels
    this.allHotels = this.hotelService.listehotels();

    // Ne rien afficher au départ
    this.hotels = [];
  }

  filterHotels(): void {
    const keyword = this.searchKeyword.trim().toLowerCase();

    if (!keyword && !this.selectedClassification) {
      // Si rien n'est saisi, ne rien afficher
      this.hotels = [];
      return;
    }

    // Filtrage par nom et éventuellement classification
    this.hotels = this.allHotels.filter(h => {
      const matchesName = keyword
        ? h.nomhotel?.toLowerCase().includes(keyword) ?? false
        : true;

      const matchesClass = this.selectedClassification
        ? h.classification?.idClass === this.selectedClassification
        : true;

      return matchesName && matchesClass;
    });
  }

  supprimerhotel(h: hotel): void {
    if (confirm("Etes-vous sûr de vouloir supprimer cet hôtel ?")) {
      this.hotelService.supprimerhotel(h);
      this.filterHotels(); // mettre à jour la liste
    }
  }
}
