import { TaskModel } from '../models/task.model';

export abstract class TaskRepository {
    abstract setInStorage(params: {key: string, value: TaskModel[]}): any;
    abstract getFromStorage(params: {key: string}): Promise<TaskModel[]>;
}