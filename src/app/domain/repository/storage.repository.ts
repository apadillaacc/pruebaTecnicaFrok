import { Storage } from '@ionic/storage-angular';

export abstract class StorageRepository {
    abstract init(): Promise<void>;
    abstract getStorageItem(): Storage | null
}