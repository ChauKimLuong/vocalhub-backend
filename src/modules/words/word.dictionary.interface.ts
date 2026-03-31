export interface IWordDictionary {
    lookUpWord(word: string): Promise<any>;
}