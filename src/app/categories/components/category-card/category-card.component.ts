import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/services/data.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
  standalone: false,
})
export class CategoryCardComponent  implements OnInit {

  @Input() category?: Category;
  @Output() onDelete = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  deleteCategory() {
    this.onDelete.emit();
  }

  editCategory() {
    this.onEdit.emit();
  }

}
