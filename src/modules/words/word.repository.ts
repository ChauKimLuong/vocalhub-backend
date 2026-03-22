import { BaseRepository } from "../../core/base.repository";
import { IWord, WordModel } from "./word.model";

export class WordRepository extends BaseRepository<IWord> {
    constructor() {
        super(WordModel);
    }

    async findByWord(word: string): Promise<IWord | null> {
        return await this.findOne({ word: word });
    }
}
