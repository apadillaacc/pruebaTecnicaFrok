
import { UseCase } from '../base/use-case';
import { TaskModel } from '../models/task.model';
import { TaskRepository } from '../repository/task.repository';

export class TaskSetInStorageUseCase implements UseCase<{ key: string; value: TaskModel[] }, any> {
    constructor(private taskRepository: TaskRepository) { }

    /**
   * Guarda el arreglo de tareas en el storage
   * @param key - Llave del storge donde se van a guardar las tareas
   * @param value - Arreglo de tareas a guardar
   */
    execute(
       params: { key: string, value: TaskModel[] },
    ): any {
        return this.taskRepository.setInStorage(params);
    }
}