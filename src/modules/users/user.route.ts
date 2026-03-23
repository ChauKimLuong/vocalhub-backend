import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { BaseRoute } from "../../core/base.route";


export class UserRoute extends BaseRoute{
    protected initRoutes(): void {
        const repo = new UserRepository();
        const service = new UserService(repo)
        const controller = new UserController(service);

        this.router.get("/", controller.getAll);
    }
}