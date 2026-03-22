import { Model, Document, QueryFilter } from "mongoose";

export abstract class BaseRepository<T extends Document> {
    protected model: Model<T>;
    constructor(model: Model<T>) {
        this.model = model;
    }

    async create(data: any): Promise<T> {
        return await this.model.create(data);
    }
    async findAll(filter: QueryFilter<T> = {}): Promise<T[]> {
        return await this.model.find(filter);
    }

    async findOne(filter: QueryFilter<T>): Promise<T | null> {
        return await this.model.findOne(filter).exec();
    }
}
