import { Router } from "express";
import { WordRoute } from "../modules/words/word.route";
import { UserRoute } from "../modules/users/user.route";

const wordRouteInstance = new WordRoute();
const userRouteInstance = new UserRoute();

const rootRouter = Router();
rootRouter.use("/words", wordRouteInstance.router);
rootRouter.use("/users", userRouteInstance.router);

export default rootRouter;