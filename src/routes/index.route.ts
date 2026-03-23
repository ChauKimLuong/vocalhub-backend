import { Router } from "express";
import { WordRoute } from "../modules/words/word.route";
import { UserRoute } from "../modules/users/user.route";
import { AuthRoute } from "../modules/auth/auth.route";

const wordRouteInstance = new WordRoute();
const userRouteInstance = new UserRoute();
const authRouteInstance = new AuthRoute();

const rootRouter = Router();
rootRouter.use("/words", wordRouteInstance.router);
rootRouter.use("/users", userRouteInstance.router);
rootRouter.use("/auth", authRouteInstance.router)

export default rootRouter;