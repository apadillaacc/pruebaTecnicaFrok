import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './cateogries-routing.module';
import { IonicModule } from '@ionic/angular';
import { CategoriesComponent } from './components/categories/categories.component';
import { FormsModule } from '@angular/forms';
import { CategoryCardComponent } from './components/category-card/category-card.component';



@NgModule({
  declarations: [CategoriesComponent, CategoryCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CategoriesRoutingModule,
  ]
})
export class CategoriesModule { }
