import { Component, OnInit } from '@angular/core';
import { Classification } from '../model/classification.model';
import { hotelService } from '../services/hotel';
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
  classifications!: Classification[];
  updatedClassification: Classification = { "idClass": 0, "nomClass": "" };

  ajout: boolean = true;

  constructor(private hotelService: hotelService) { }

  ngOnInit(): void {
    this.hotelService.listeClassifications().
      subscribe(classifications => {
        this.classifications = classifications;
        console.log(classifications);
      });
  }

  classificationUpdated(classification: Classification) {
    console.log("Classification updated event", classification);
    this.hotelService.ajouterClassification(classification).
      subscribe(() => this.chargerClassifications());
  }

  chargerClassifications() {
    this.hotelService.listeClassifications().
      subscribe(classifications => {
        this.classifications = classifications;
        console.log(classifications);
      });
  }

  updateClassification(classification: Classification) {
    this.updatedClassification = classification;
    this.ajout = false;
  }

}
