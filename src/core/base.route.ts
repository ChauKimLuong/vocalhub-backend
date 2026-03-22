import { Router } from "express";


export abstract class BaseRoute {
    public router: Router;

    constructor(){
        this.router =  Router();
        this.initRoutes();
    }

    protected abstract initRoutes(): void;
}