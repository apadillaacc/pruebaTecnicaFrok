import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { Category, DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  standalone: false,
  providers: []
})
export class CategoriesComponent  implements OnInit {
  private data = inject(DataService);

  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('createCategoryForm') createForm!: NgForm;
  categoryName!: string;
  categories: Category[] = [];
  categoryToEdit: Category | null = null;
  isEdit = false;
  constructor() { }

  ngOnInit() {
    this.getCategories();
  }

  /**
   * Carga las categorias desde el storage
   */
  getCategories() {
    this.data.getFromStorage('categories').then(response => {
      this.categories = response ?? [];
    });
  }

  /**
   * Abre el modal de crear o editar categoria segun el botón seleccionado
   */
  createOrEditCategory() {
    if(this.isEdit) {
      const index = this.categories.findIndex(category => category.name === this.categoryToEdit?.name);
      if(index !== -1) {
        this.categories[index].name = this.categoryName;
      }
      this.revertEditFlag();
    } else {
      this.categories.push({
        name: this.categoryName
      });
    }
    this.createForm.reset();
    this.saveCategoriesInstorage();
    this.modal.dismiss();
  }

  /**
   * Elimina una categoria y guarda el arreglo en storage
   * @param categoryToDelete - Categoria a eliminar
   */
  deleteCategory(categoryToDelete: Category) {
    this.categories = this.categories.filter(category => category.name !== categoryToDelete.name);
    this.saveCategoriesInstorage();
  }

  /**
   * Asigna los valores relevante y muestra el modal de aditar categoria
   * @param category - Categoria a editar
   */
  editCategory(category: Category) {
    this.categoryToEdit = category;
    this.categoryName = category.name;
    this.isEdit = true;
    this.modal.present();
  }

  /**
   * Cierra el modal de creacion de categoria
   */
  modalCancel() {
    this.modal.dismiss(null, 'cancel');
    this.createForm.reset();
    this.revertEditFlag();
  }

  /**
   * Retorna el flag de edicion a su valor por defecto
   */
  revertEditFlag() {
    setTimeout(() => {
      if (this.isEdit) {
        this.isEdit = false;
      }
    }, 1000);
  }

  /**
   * Guarda las categorias en el storage
   */
  saveCategoriesInstorage() {
    this.data.setCategoriesInStorage('categories', this.categories);
  }

}
