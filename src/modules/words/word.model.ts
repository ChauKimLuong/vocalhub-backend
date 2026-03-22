import {Schema, Document, model} from "mongoose";

export interface IWord extends Document {
    word: string,
    pos: string, 
    ipa: string, 
    definition: string,
    definition_vi: string, 
    meaning_vi: string
    example: string,
    audioUrl: string, 
    createdAt: Date
}

const WordSchema = new Schema<IWord>({
    word: { type: String, required: true, index: true },
    pos: { type: String, required: true},
    ipa: { type: String },
    definition: { type: String },
    definition_vi: { type: String },
    meaning_vi: { type: String },
    example: { type: String },
    audioUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
})

export const WordModel = model<IWord>('Word', WordSchema);