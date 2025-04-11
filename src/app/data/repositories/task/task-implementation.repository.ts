import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { TaskModel } from 'src/app/domain/models/task.model';
import { TaskRepository } from 'src/app/domain/repository/task.repository';
import { StoragetItemUseCase } from 'src/app/domain/usecases/storage-get-item';

@Injectable({
  providedIn: 'root',
})

export class TaskImplementationRepository extends TaskRepository {
  private _storage: Storage | null = null;

  constructor(private storage: StoragetItemUseCase) {
    super();
    this._storage = this.storage.execute();
  }

  setInStorage(params: { key: string; value: TaskModel[] }): any {
    return this._storage?.set(params.key, params.value);
  }

  async getFromStorage(params: { key: string }): Promise<TaskModel[]> {
    const value = await this._storage?.get(params.key);
    return value;
  }
}
