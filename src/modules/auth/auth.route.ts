import { Router } from "express";
import { AuthController } from "./auth.controller";
import { BaseRoute } from "../../core/base.route";

export class AuthRoute extends BaseRoute {
    protected initRoutes(): void {
        this.router.post("/login/email", AuthController.loginWithEmail);
        this.router.post("/login/google", AuthController.loginWithGoogle);
        this.router.post("/sign-up", AuthController.signup);
    }
}
