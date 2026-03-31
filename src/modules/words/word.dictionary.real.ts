import { IWordDictionary } from "./word.dictionary.interface";
import { WordModel } from "./word.model";
import { WordRepository } from "./word.repository";

const wordRepository = new WordRepository();

export class RealWordDictionary implements IWordDictionary { 
    async lookUpWord(word: string): Promise<any> {
        console.log(`[Real Dictionary] Đang truy vấn Database cho: ${word}...`);
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const result = await wordRepository.findByWord(word);
        return result; 
    }
}