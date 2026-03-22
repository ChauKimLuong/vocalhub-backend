import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

class Database {
    private static instance: Database;
    private readonly mongoUrl: string = process.env.MONGO_URI || "";

    private constructor(){
        this.connect();
    }

    public static async getInstance(): Promise<Database> {
        if (!Database.instance){
            Database.instance = new Database();
       }
       return Database.instance;
    }

    private async connect(): Promise<void> {
        try {
            await mongoose.connect(this.mongoUrl);
            console.log("!!!!! MongoDB connected successfully to VocalHub");
        } catch (error) {
            console.error("????? MongoDB connection error: ", error)
            process.exit(1);
        }
    }

}

export default Database;