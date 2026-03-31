import { Request, Response } from 'express';
import { WordService } from './word.service';

export class WordController {
    private wordService: WordService;
    
    constructor(wordService: WordService){
        this.wordService = wordService;
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            const data = await this.wordService.getAll();
            
            res.status(200).json({ success: true, count: data.length, data });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    public search = async (req: Request, res: Response) => {
        try {
            const data = await this.wordService.search(req.body.word);
            
            res.status(200).json({ success: true, count: data.length, data });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    public create = async (req: Request, res: Response) => {
        try {
            const data = this.wordService.createWord(req.body);
            console.log(req.body);
            res.status(201).json({ success: true, data });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}