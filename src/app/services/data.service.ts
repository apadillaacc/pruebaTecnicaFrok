import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Task {
  nombreTarea: string;
  descripcion: string;
  fechaCreacion: string;
  completada: boolean;
  categoria?: string;
}

export interface Category {
  name: string;
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

  /**
   * Inicia el storage
   */
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  /**
   * Guarda el arreglo de tareas en el storage
   * @param key - Llave del storge donde se van a guardar las tareas
   * @param value - Arreglo de tareas a guardar
   */
  public setTasksInStorage(key: string, value: Task[]) {
    this._storage?.set(key, value);
  }

   /**
   * Guarda el arreglo de categorias en el storage
   * @param key - Llave del storge donde se van a guardar las categorias
   * @param value - Arreglo de categorias a guardar
   */
  public setCategoriesInStorage(key: string, value: Category[]) {
    this._storage?.set(key, value);
  }

   /**
   * Obtiene los valores de una llave del storage
   * @param key - Llave del storge de donde van a salir los datos
   */
  public async getFromStorage(key: string) {
    const value = await this._storage?.get(key);
    return value;
  }

  /**
   * Lismpia el storage
   */
  public async clearStorage() {
    await this._storage?.clear();
  }
}
