import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TypeHotel } from '../model/typeHotel.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-update-classification',
  standalone: true,
  imports: [FormsModule, CommonModule],

  templateUrl: './update-classification.html',
  styles: ``
})
export class UpdateClassification implements OnInit {

  @Input()
  classification!: TypeHotel;

  @Output()
  classificationUpdated = new EventEmitter<TypeHotel>();

  @Input()
  ajout!: boolean;

  ngOnInit(): void {
    console.log('UpdateClassification init', this.classification);
  }

  saveClassification() {
    this.classificationUpdated.emit(this.classification);
  }
}