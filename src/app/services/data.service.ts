import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Task {
  nombreTarea: string;
  descripcion: string;
  fechaCreacion: string;
  completada: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _storage: Storage | null = null;
  public tasks: Task[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    console.log('created storage');
  }

  public setInStorage(key: string, value: Task[]) {
    this._storage?.set(key, value);
  }

  public async getFromStorage(key: string) {
    const value = await this._storage?.get(key);
    return value;
  }

  public async clearStorage() {
    await this._storage?.clear();
  }
}
