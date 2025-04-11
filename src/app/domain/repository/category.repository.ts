import { Category } from '../models/category.model';

export abstract class CategoryRepository {
    abstract setInStorage(params: {key: string, value: Category[]}): Promise<any>;
    abstract getFromStorage(params: {key: string}): Promise<Category[]>;
}