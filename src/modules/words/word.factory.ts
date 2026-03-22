import { IWord } from "./word.model";

export class WordFactory {
    public static createWordData(rawData: any): Partial<IWord> {
        return {
            word: rawData.word?.trim(),
            pos: rawData.pos || "n/a",
            ipa: rawData.ipa || "",
            definition: rawData.definition || "",
            definition_vi: rawData.definition_vi || "",
            meaning_vi: rawData.meaning_vi || "",
            example: rawData.example || "",
            audioUrl: rawData.audioUrl || "",
            createdAt: new Date(),
        };
    }
}
