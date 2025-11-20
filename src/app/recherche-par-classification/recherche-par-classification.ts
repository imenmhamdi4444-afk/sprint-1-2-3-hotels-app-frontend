import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { hotel } from '../model/hotel.model';
import { hotelService } from '../services/hotel';
import { Classification } from '../model/classification.model';

@Component({
  standalone: true,
  selector: 'app-recherche-par-classification',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recherche-par-classification.html',
})
export class RechercheParClassification implements OnInit {

  hotels: hotel[] = [];
  classifications: Classification[] = [];
  idclassification: number | null = null;

  constructor(private hotelService: hotelService) { }

  ngOnInit(): void {
    this.classifications = this.hotelService.listeclassifications();
  }

  onSearch(): void {
    if (this.idclassification != null) {
      console.log("ID sélectionné :", this.idclassification);
      this.hotels = this.hotelService.rechercherParClassification(this.idclassification);
    } else {
      this.hotels = [];
      console.warn("Veuillez choisir une classification !");
    }
  }

  supprimerhotel(h: hotel): void {
    if (confirm("Etes-vous sûr de vouloir supprimer cet hôtel ?")) {
      this.hotelService.supprimerhotel(h);
      this.onSearch();
    }
  }
}