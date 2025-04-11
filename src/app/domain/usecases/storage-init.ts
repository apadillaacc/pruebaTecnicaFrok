import { UseCase } from '../base/use-case';
import { StorageRepository } from '../repository/storage.repository';

export class StorageInitUseCase implements UseCase<undefined, void> {
    constructor(private dataRepository: StorageRepository) { }

    /**
   * Inicia el storage
   */
    execute(): Promise<void> {
        return this.dataRepository.init();
    }
}