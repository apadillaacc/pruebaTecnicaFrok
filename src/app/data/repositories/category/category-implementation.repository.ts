import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Category } from 'src/app/domain/models/category.model';
import { CategoryRepository } from 'src/app/domain/repository/category.repository';
import { StoragetItemUseCase } from 'src/app/domain/usecases/storage-get-item';

@Injectable({
  providedIn: 'root',
})

export class CategoryImplementationRepository extends CategoryRepository {
  private _storage: Storage | null = null;

  constructor(private storage: StoragetItemUseCase) {
    super();
    this._storage = this.storage.execute();
  }

  setInStorage(params: { key: string; value: Category[] }): any {
    return this._storage?.set(params.key, params.value);
  }

  async getFromStorage(params: { key: string }): Promise<Category[]> {
    const value = await this._storage?.get(params.key);
    return value;
  }
}
