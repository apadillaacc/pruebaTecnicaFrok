import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { StorageRepository } from 'src/app/domain/repository/storage.repository';

@Injectable({
    providedIn: 'root',
})

export class StorageImplementationRepository extends StorageRepository {
    private _storage: Storage | null = null;
  
    constructor(private storage: Storage) {
        super();
    }

    async init() {
      const storage = await this.storage.create();
      this._storage = storage;
    }

    override getStorageItem(): Storage | null {
      return this._storage;
    }
}