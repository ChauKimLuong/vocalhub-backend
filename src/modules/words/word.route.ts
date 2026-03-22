import { BaseRoute } from "../../core/base.route";
import { WordController } from "./word.controller";
import { WordService } from "./word.service";
import { WordRepository } from "./word.repository";

export class WordRoute extends BaseRoute {
    protected initRoutes(): void {
        const repository = new WordRepository();
        const service = new WordService(repository);
        const controller = new WordController(service);

        this.router.post("/", controller.create);
        this.router.get("/", controller.getAll);
    }
}
 