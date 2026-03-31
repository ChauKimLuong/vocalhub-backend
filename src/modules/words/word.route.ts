import { BaseRoute } from "../../core/base.route";
import { WordController } from "./word.controller";
import { WordService } from "./word.service";
import { WordRepository } from "./word.repository";
import { ProxyWordDictionary } from "./word.dictionary.proxy";

export class WordRoute extends BaseRoute {
    protected initRoutes(): void {
        const repository = new WordRepository();
        const proxyDictionary = new ProxyWordDictionary();
        const service = new WordService(repository, proxyDictionary);
        const controller = new WordController(service);

        this.router.post("/", controller.create);
        this.router.get("/", controller.getAll);
        this.router.get("/search/", controller.search);
    }
}
 