import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { hotel } from '../model/hotel.model';
import { hotelService } from '../services/hotel';
import { ActivatedRoute, Router } from '@angular/router';
import { Classification } from '../model/classification.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-hotel',
  standalone: true, 
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './update-hotel.html',
  styles: ``
})
export class Updatehotel implements OnInit {
  currentHotel = new hotel(); 
  classificationsList!: Classification[];
  updatedClassId!: number;
  hotelForm!: FormGroup; 

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router, 
    private hotelService: hotelService,
    private formBuilder: FormBuilder
  ) { } 

  ngOnInit(): void {
    this.classificationsList = this.hotelService.listeclassifications();
    
    // Récupérer l'hôtel avec vérification
    const hotelId = +this.activatedRoute.snapshot.params['id'];
    const foundHotel = this.hotelService.consulterhotel(hotelId);
    
    if (foundHotel) {
      this.currentHotel = foundHotel;
      // defensive read: use optional chaining and a default (0) so updatedClassId is always a number
      this.updatedClassId = this.currentHotel.classification?.idClass ?? 0;

      this.hotelForm = this.formBuilder.group({  
        idhotel: [this.currentHotel.idhotel, [Validators.required]],
        nomhotel: [this.currentHotel.nomhotel, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        prixnuit: [this.currentHotel.prixnuit, [Validators.required, Validators.min(10), Validators.max(2000)]],
        etoiles: [this.currentHotel.etoiles, [Validators.required, Validators.min(1), Validators.max(5)]],
        ville: [this.currentHotel.ville, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        email: [this.currentHotel.email, [Validators.required, Validators.email]],
        idClass: [this.updatedClassId, [Validators.required]], 
      });
    } else {
      this.router.navigate(['hotels']);
    }
  }
  
  updatehotel(): void { 
    if (this.hotelForm.invalid) {
      Object.keys(this.hotelForm.controls).forEach(key => {
        this.hotelForm.get(key)?.markAsTouched();
      });
      return;
    }

    // read form values and update currentHotel fields before saving
    const formValues = this.hotelForm.value;
    console.log('[Updatehotel] formValues:', formValues);

    // Update primitive fields
    this.currentHotel.nomhotel = formValues.nomhotel;
    this.currentHotel.prixnuit = formValues.prixnuit;
    this.currentHotel.etoiles = formValues.etoiles;
    this.currentHotel.ville = formValues.ville;
    this.currentHotel.email = formValues.email;

    // determine classification from selected id (convert to number)
    const selectedClassId = Number(formValues.idClass) || Number(this.updatedClassId) || 0;
    if (!selectedClassId) {
      console.warn('[Updatehotel] no classification selected');
      return;
    }

    const classification = this.hotelService.consulterClassification(selectedClassId);
    if (!classification) {
      console.warn('[Updatehotel] classification not found for id', selectedClassId);
      return;
    }

    this.currentHotel.classification = classification;

    console.log('[Updatehotel] currentHotel before update:', JSON.parse(JSON.stringify(this.currentHotel)));
    console.log('[Updatehotel] saving currentHotel:', JSON.parse(JSON.stringify(this.currentHotel)));
    this.hotelService.updatehotel(this.currentHotel);
    this.router.navigate(['hotels']);
  }
}