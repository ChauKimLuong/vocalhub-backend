export interface IAuthStrategy {
    authenticate(data: any): Promise<any>;
}