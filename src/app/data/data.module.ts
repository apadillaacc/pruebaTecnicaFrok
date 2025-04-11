import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRepository } from '../domain/repository/task.repository';
import { TaskGetFromStorageUseCase } from '../domain/usecases/task-get-from-storage';
import { TaskSetInStorageUseCase } from '../domain/usecases/task-set-in-storage';
import { TaskImplementationRepository } from './repositories/task/task-implementation.repository';
import { CategoryRepository } from '../domain/repository/category.repository';
import { CategorySetInStorageUseCase } from '../domain/usecases/category-set-in-storage';
import { CategoryGetFromStorageUseCase } from '../domain/usecases/category-get-from-storage';
import { CategoryImplementationRepository } from './repositories/category/category-implementation.repository';
import { StorageRepository } from '../domain/repository/storage.repository';
import { StoragetItemUseCase } from '../domain/usecases/storage-get-item';
import { StorageImplementationRepository } from './repositories/storage/storage-implementation.repository';
import { StorageInitUseCase } from '../domain/usecases/storage-init';

const taskSetInStorageUseCaseFactory = (taskRepo: TaskRepository) =>
  new TaskSetInStorageUseCase(taskRepo);
export const taskSetInStorageUseCaseProvider = {
  provide: TaskSetInStorageUseCase,
  useFactory: taskSetInStorageUseCaseFactory,
  deps: [TaskRepository],
};

const taskGetFromStorageUseCaseFactory = (taskRepo: TaskRepository) =>
  new TaskGetFromStorageUseCase(taskRepo);
export const taskGetFromStorageUseCaseProvider = {
  provide: TaskGetFromStorageUseCase,
  useFactory: taskGetFromStorageUseCaseFactory,
  deps: [TaskRepository],
};

const categorySetInStorageCaseFactory = (categoryRepo: CategoryRepository) =>
  new CategorySetInStorageUseCase(categoryRepo);
export const categorySetInStorageCaseProvider = {
  provide: CategorySetInStorageUseCase,
  useFactory: categorySetInStorageCaseFactory,
  deps: [CategoryRepository],
};

const categoryGetFromStorageUseCaseFactory = (categoryRepo: CategoryRepository) =>
  new CategoryGetFromStorageUseCase(categoryRepo);
export const categoryGetFromStorageUseCaseProvider = {
  provide: CategoryGetFromStorageUseCase,
  useFactory: categoryGetFromStorageUseCaseFactory,
  deps: [CategoryRepository],
};

const storageInitUseCaseFactory = (storageRepo: StorageRepository) =>
  new StorageInitUseCase(storageRepo);
export const storageInitUseCaseProvider = {
  provide: StorageInitUseCase,
  useFactory: storageInitUseCaseFactory,
  deps: [StorageRepository],
};

const storageGetItemUseCaseFactory = (storageRepo: StorageRepository) =>
  new StoragetItemUseCase(storageRepo);
export const storagetItemUseCaseProvider = {
  provide: StoragetItemUseCase,
  useFactory: storageGetItemUseCaseFactory,
  deps: [StorageRepository],
};

@NgModule({
  providers: [
    taskSetInStorageUseCaseProvider,
    taskGetFromStorageUseCaseProvider,
    { provide: TaskRepository, useClass: TaskImplementationRepository },
    categorySetInStorageCaseProvider,
    categoryGetFromStorageUseCaseProvider,
    { provide: CategoryRepository, useClass: CategoryImplementationRepository },
    storagetItemUseCaseProvider,
    storageInitUseCaseProvider,
    { provide: StorageRepository, useClass: StorageImplementationRepository },
  ],
  imports: [CommonModule],
})
export class DataModule {}
