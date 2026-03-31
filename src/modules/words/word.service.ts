import { WordRepository } from './word.repository';
import { WordFactory } from './word.factory';
import { ProxyWordDictionary } from './word.dictionary.proxy';

export class WordService {
    private wordRepository: WordRepository;
    private proxyDictionary: ProxyWordDictionary;

    constructor(wordRepository: WordRepository, proxyDictionary: ProxyWordDictionary){
        this.wordRepository = wordRepository;
        this.proxyDictionary = proxyDictionary;
    }

    async search(word: string){
        const wordData = this.proxyDictionary.lookUpWord(word);
        if (!wordData) throw new Error("Không tìm thấy từ vựng này!");
        return wordData;
    }

    async getAll() {
        return this.wordRepository.findAll();
    }


    async createWord(rawData: any){
        const processedData = WordFactory.createWordData(rawData);
        return this.wordRepository.create(processedData);
    }
}