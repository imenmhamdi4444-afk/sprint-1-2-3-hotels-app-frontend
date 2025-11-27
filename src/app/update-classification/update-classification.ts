import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Classification } from '../model/classification.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-classification',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-classification.html',
  styles: ``
})
export class UpdateClassification implements OnInit {

  @Input()
  classification!: Classification;

  @Output()
  classificationUpdated = new EventEmitter<Classification>();

  @Input()
  ajout!: boolean;

  ngOnInit(): void {
    console.log('ngOnInit du composant UpdateClassification', this.classification);
  }

  saveClassification() {
    this.classificationUpdated.emit(this.classification);
  }

}
