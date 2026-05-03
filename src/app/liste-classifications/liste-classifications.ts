import { Component, OnInit } from '@angular/core';
import { TypeHotel } from '../model/typeHotel.model';
import { HotelService } from '../services/hotel';
import { CommonModule } from '@angular/common';
import { UpdateClassification } from '../update-classification/update-classification';

@Component({
  selector: 'app-liste-classifications',
  standalone: true,
  imports: [CommonModule, UpdateClassification],
  templateUrl: './liste-classifications.html',
  styles: ``
})
export class ListeClassifications implements OnInit {
  typeHotels: TypeHotel[] = [];
  updatedType: TypeHotel = { idType: 0, nomType: '', descriptionType: '' };
  ajout: boolean = true;

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.chargerTypes();
  }

  chargerTypes(): void {
    this.hotelService.getAllTypeHotels().subscribe({
      next: (types) => {
        this.typeHotels = types._embedded.typeHotels;
      },
      error: (err) => {
        console.error('Erreur chargement types:', err);
      }
    });
  }

  typeUpdated(type: TypeHotel): void {
    this.hotelService.ajouterType(type).subscribe({
      next: () => {
        this.chargerTypes();
      }
    });
  }

  updateType(type: TypeHotel): void {
    this.updatedType = type;
    this.ajout = false;
  }
}