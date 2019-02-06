import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable()
export class UserAuthService {


    /** The key for authentication token */
    private tokenKey: string;

    constructor() {

        this.tokenKey = 'AUTH_TOKEN';
    }


    /**
     * Store authentication token in local storage
     * @ param { string } token - The auth token
     * @ return { void }
     */
    public setToken(token: string) {
        localStorage.setItem(this.tokenKey, token);
    }

    /**
     * Retrieve authentication token from local storage
     * @ param { none }
     * @ return { String } - The authentication token
     */
    public getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    /**
     * Remove authentication token from local storage
     * @ param { none }
     * @ return { void }
     */
    public removeToken() {
        localStorage.removeItem(this.tokenKey);
    }

    public getUserProfile() {
        const token: string = localStorage.getItem(this.tokenKey);
        if(token) {
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(token);
            return decodedToken;
        }

        return null;
    }


    public clearSession() {
        this.removeToken();
    }
}
