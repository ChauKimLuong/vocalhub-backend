import { WordRepository } from './word.repository';
import { WordFactory } from './word.factory';

export class WordService {
    private wordRepository: WordRepository;

    constructor(wordRepository: WordRepository){
        this.wordRepository = wordRepository;
    }

    async getAll() {
        return this.wordRepository.findAll();
    }


    async createWord(rawData: any){
        const processedData = WordFactory.createWordData(rawData);
        return this.wordRepository.create(processedData);
    }
}