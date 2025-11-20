import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { hotel } from '../model/hotel.model';
import { hotelService } from '../services/hotel';
import { Classification } from '../model/classification.model';

@Component({
  selector: 'app-add-hotel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-hotel.html'
})
export class Addhotel implements OnInit {
  newHotel = new hotel();
  newClassId!: number;
  classificationsList!: Classification[];
  message!: string;
  hotelForm!: FormGroup;

  constructor(
    private hotelService: hotelService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.classificationsList = this.hotelService.listeclassifications();

    this.hotelForm = this.formBuilder.group({
      nomhotel: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      ville: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      prixnuit: ['', [Validators.required, Validators.min(10), Validators.max(2000)]],
      etoiles: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      email: ['', [Validators.required, Validators.email]],
      idClass: ['', [Validators.required]]
    });
  }

  addHotel(): void { 
    if (this.hotelForm.invalid) {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.hotelForm.controls).forEach(key => {
        this.hotelForm.get(key)?.markAsTouched();
      });
      return;
    }

    // Read values from the reactive form to ensure model is populated
    const values = this.hotelForm.value;
    console.log('[Addhotel] form values:', values);

    this.newHotel.nomhotel = values.nomhotel;
    this.newHotel.ville = values.ville;
    this.newHotel.prixnuit = values.prixnuit;
    this.newHotel.etoiles = values.etoiles;
    this.newHotel.email = values.email;

    // Vérifier si un classement est sélectionné — convertit la valeur en nombre
    const selectedId = Number(values.idClass || this.newClassId);
    if (!selectedId || isNaN(selectedId)) {
      this.message = 'Veuillez sélectionner une classification !';
      return;
    }

    const classification = this.hotelService.consulterClassification(selectedId);
    if (!classification) {
      this.message = 'Classification non trouvée !';
      return;
    }

    this.newHotel.classification = classification;
    console.log('[Addhotel] creating hotel:', JSON.parse(JSON.stringify(this.newHotel)));
    this.hotelService.ajouterhotel(this.newHotel);
    this.router.navigate(['hotels']);
  }
}