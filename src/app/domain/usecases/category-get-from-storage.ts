import { UseCase } from '../base/use-case';
import { Category } from '../models/category.model';
import { CategoryRepository } from '../repository/category.repository';

export class CategoryGetFromStorageUseCase implements UseCase<{ key: string }, Category[]> {
    constructor(private taskRepository: CategoryRepository) { }

    /**
   * Obtiene los valores de una llave del storage
   * @param key - Llave del storge de donde van a salir los datos
   */
    execute(
       params: { key: string },
    ): Promise<Category[]> {
        return this.taskRepository.getFromStorage(params);
    }
}