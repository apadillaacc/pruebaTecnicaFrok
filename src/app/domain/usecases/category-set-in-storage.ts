
import { UseCase } from '../base/use-case';
import { Category } from '../models/category.model';
import { CategoryRepository } from '../repository/category.repository';


export class CategorySetInStorageUseCase implements UseCase<{ key: string; value: Category[] }, any> {
    constructor(private taskRepository: CategoryRepository) { }

    /**
   * Guarda el arreglo de categorias en el storage
   * @param key - Llave del storge donde se van a guardar las categorias
   * @param value - Arreglo de categorias a guardar
   */
    execute(
       params: { key: string, value: Category[] },
    ): Promise<any> {
        return this.taskRepository.setInStorage(params);
    }
}