import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import Database from "./config/database";
import rootRouter from "./routes/index.route";
import cors from "cors";
import './modules/notifications/listeners';
import './modules/users/listeners';

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
        this.app.use('/api/v1', rootRouter);
        this.listen();
    }

    private async connectDatabase(): Promise<void> {
        await Database.getInstance();
    }

    private middlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
    }

    private listen(): void {
        this.app.listen(this.port, () => {
            console.log(`=========================================`);
            console.log(`🚀 VocalHub Server is flying on port ${this.port}`);
            console.log(`🔗 API: http://localhost:${this.port}/api/v1/words`);
            console.log(`=========================================`);
        });
    }
}

const server = new Server();
server.start();
