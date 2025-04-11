
import { UseCase } from '../base/use-case';
import { TaskModel } from '../models/task.model';
import { TaskRepository } from '../repository/task.repository';

export class TaskGetFromStorageUseCase implements UseCase<{ key: string }, TaskModel[]> {
    constructor(private taskRepository: TaskRepository) { }

    /**
   * Obtiene los valores de una llave del storage
   * @param key - Llave del storge de donde van a salir los datos
   */
    execute(
       params: { key: string },
    ): Promise<TaskModel[]> {
        return this.taskRepository.getFromStorage(params);
    }
}