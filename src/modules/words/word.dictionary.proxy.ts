import { IWordDictionary } from "./word.dictionary.interface";
import { RealWordDictionary } from "./word.dictionary.real";

export class ProxyWordDictionary implements IWordDictionary {
    private realDictionary: RealWordDictionary;
    private cache: Map<string, any>;

    constructor(){
        this.realDictionary = new RealWordDictionary();
        this.cache = new Map<string, any>;
    }

    async lookUpWord(word: string): Promise<any> {
        if(this.cache.has(word)) {
            console.log(`[Proxy] Lấy từ "${word}" từ bộ nhớ đệm`);
            return this.cache.get(word);
        }
        console.log(`[Proxy] Từ "${word}" chưa có trong Cache. Bắt đầu gọi Real Dictionary...`);
        const result = this.realDictionary.lookUpWord(word);

        if(result){
            this.cache.set(word, result);
        }
        return result;
    }
}