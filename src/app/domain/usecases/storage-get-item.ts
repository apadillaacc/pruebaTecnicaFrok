import { StorageRepository } from '../repository/storage.repository';
import { Storage } from '@ionic/storage-angular';

export class StoragetItemUseCase {
    constructor(private dataRepository: StorageRepository) { }
    execute(): Storage | null {
        return this.dataRepository.getStorageItem();
    }
}