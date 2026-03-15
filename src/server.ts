import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import Database from "./config/database";
import cors from "cors"

dotenv.config();


class Server {
    private app: Application;
    private port: number | string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
    }

    public async start(): Promise<void> {
        await this.connectDatabase();
        this.middlewares();
        this.routes();
        this.listen();
    }

    private async connectDatabase(): Promise<void> {
        await Database.getInstance();
    }

    private middlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cors());
    }

    private routes(): void {
        this.app.get("/", (req: Request, res: Response) => {
            res.send("Welcome to VocalHub API");
        })
    }

    private listen(): void {
        this.app.listen(this.port, () => console.log(`Server is running at http://localhost:${this.port}`));
    }
}


const server = new Server();
server.start();





